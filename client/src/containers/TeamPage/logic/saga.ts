import {
	getTeam,
	updateFieldById,
	updateLinks,
	deleteOneLink,
	getTeamsProjects,
	getTeamsUsers,
	findUsersColleagues,
	addUsersToTeam
} from 'services/team.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { Link } from '../index';
import { NotificationManager } from 'react-notifications';

type Props = {
	id: string;
	link?: Link;
	field?: string;
	type: string;
};

type PropsPost = {
	id: string;
	match: string
}

export function* fetchTeam(props: Props) {
	try {
		yield put(actions.spinner());
		const [team, users, projects] = yield all([
			yield call(getTeam, props.id),
			yield call(getTeamsUsers, props.id),
			yield call(getTeamsProjects, props.id),
		]);
		yield all([
			put(actions.updateTeam({ team: team })),
			put(actions.updateUsers({ users: users.users, createdBy: users.createdBy })),
			put(actions.updateProjects({ projects: projects.projects })),
		]);
	} catch (error) {
		yield put(actions.failLoading());
		NotificationManager.error('Error load data', 'Error', 4000);
	}
}

export function* fetchLinks(props: Props) {
	try {
		const team = yield call(updateLinks, props.id, props.link);
		yield put(actions.updateLinkFieldsSuccess({ links: team.links }));
		NotificationManager.success('Data updated succesful', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Error load team links', 'Error', 4000);
	}
}
export function* deleteLink(props: Props) {
	try {
		const team = yield call(deleteOneLink, props.id, props.link);
		yield put(actions.updateLinkFieldsSuccess({ links: team.links }));
		NotificationManager.info('Link has been deleted', 'Info', 4000);
	} catch (error) {
		NotificationManager.error('Error update data', 'Error', 4000);
	}
}
export function* updateField(props: Props) {
	try {
		const team = yield call(updateFieldById, props.id, props.field);
		yield put(actions.updateFieldsSuccess({ field: { name: team.name, description: team.description } }));
		NotificationManager.success('Data updated succesful', 'Success', 4000);
	} catch (error) {
		NotificationManager.error('Error update data', 'Error', 4000);
	}
}
// TODO: define type
export function* searchPeople(props: any) {
	try {
		yield put(actions.searchPeopleLoader());
		const users = yield call(findUsersColleagues, props.id, props.match);
		const searchResult: { data: any; key: any; title: any; }[] = [];
		users.filter((el: any) => {
			searchResult.push({
				data: el,
				key: el.id,
				title: el.firstName
			})
		})
		yield put(actions.successSearchPeople({ results: searchResult }));
	} catch (error) {
	}
}

function* inviteUsersToTeam({ id, users }: any) {
	try {
		const team = yield call(addUsersToTeam, id, users);
		yield put(actions.addPeopleToTeamDone({ users: team.users }))

	} catch (error) {
		console.log(error);
	}
}

function* clearResultField() {
	yield put(actions.clearResultsDone());
}

export function* watchStartLoading() {
	yield takeEvery(actionTypes.START_LOADING, fetchTeam);
}
export function* watchAddLinksLoading() {
	yield takeEvery(actionTypes.ADD_LINK_LOADING, fetchLinks);
}

export function* watchDeleteLinksLoading() {
	yield takeEvery(actionTypes.DELETE_LINK_LOADING, deleteLink);
}

export function* watchFieldUpdateLoading() {
	yield takeEvery(actionTypes.UPDATE_FIELD_LOADING, updateField);
}

export function* watchSearchPeopleLoading() {
	yield takeEvery(actionTypes.START_SEARCHING_PEOPLE, searchPeople);
}

export function* watchClearSearchResults() {
	yield takeEvery(actionTypes.CLEAR_FOUND_USERS, clearResultField);
}

export function* watchAddPeopleToTeam() {
	yield takeEvery(actionTypes.ADD_PEOPLE_TO_TEAM_LOADING, inviteUsersToTeam);
}

export default function* teamSaga() {
	yield all([
		watchStartLoading(),
		watchAddLinksLoading(),
		watchFieldUpdateLoading(),
		watchDeleteLinksLoading(),
		watchSearchPeopleLoading(),
		watchAddPeopleToTeam()
	]);
}
