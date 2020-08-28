import {
	getTeam,
	updateFieldById,
	updateLinks,
	deleteOneLink,
	getTeamsProjects,
	getTeamsUsers,
	findUsersColleagues,
	addUsersToTeam,
	deleteTeamRequest
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
	match?: string;
	users?: WebApi.Entities.UserProfile[];
};

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

export function* searchPeople(props: Props) {
	try {
		yield put(actions.searchPeopleLoader());
		const users = yield call(findUsersColleagues, props.id, props.match);
		yield put(actions.successSearchPeople({ results: users }));
	} catch (error) {
		yield put(actions.failSearchPeople());
	}
}

function* inviteUsersToTeam(props: Props) {
	try {
		const team = yield call(addUsersToTeam, props.id, props.users);
		yield put(actions.addPeopleToTeamDone({ users: team.users }));
	} catch (error) {
		NotificationManager.error('Error add users to team', 'Error', 4000);
	}
}

function* deleteTeam(props: Props) {
	try {
		yield call(deleteTeamRequest, props.id);
		yield put(actions.deleteTeamSuccess());
		NotificationManager.info('Team has been deleted', 'Info', 4000);
		window.location.replace('/people');
	} catch (error) {
		NotificationManager.error('Error delete team', 'Error', 4000);
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

export function* watchDeleteTeam() {
	yield takeEvery(actionTypes.DELETE_TEAM_LOADING, deleteTeam);
}

export default function* teamSaga() {
	yield all([
		watchStartLoading(),
		watchAddLinksLoading(),
		watchFieldUpdateLoading(),
		watchDeleteLinksLoading(),
		watchSearchPeopleLoading(),
		watchAddPeopleToTeam(),
		watchDeleteTeam()
	]);
}
