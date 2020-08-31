import {
	getTeam,
	updateFieldById,
	updateLinks,
	deleteOneLink,
	getTeamsProjects,
	getTeamsUsers,
	findUsersColleagues,
	addUsersToTeam,
	deleteTeamRequest,
	removeUserFromTeamRequest,
} from 'services/team.service';

import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { Link } from '../index';
import { NotificationManager } from 'react-notifications';
import history from 'helpers/history.helper';
import i18next from 'i18next';

type Props = {
	id: string;
	link?: Link;
	field?: string;
	type: string;
	match?: string;
	users?: WebApi.Entities.UserProfile[];
};

type RemoveUserFromTeam = {
	userId: string;
	teamId: string;
	type: string;
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
		NotificationManager.error(i18next.t('error_load_data'), i18next.t('error'), 4000);
	}
}

export function* fetchLinks(props: Props) {
	try {
		const team = yield call(updateLinks, props.id, props.link);
		yield put(actions.updateLinkFieldsSuccess({ links: team.links }));
		NotificationManager.success(i18next.t('data_updated_succesful'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('error_load_team_links'), i18next.t('error'), 4000);
	}
}

export function* deleteLink(props: Props) {
	try {
		const team = yield call(deleteOneLink, props.id, props.link);
		yield put(actions.updateLinkFieldsSuccess({ links: team.links }));
		NotificationManager.info(i18next.t('link_has_been_deleted'), i18next.t('info'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('error_update_data'), i18next.t('error'), 4000);
	}
}

export function* updateField(props: Props) {
	try {
		const team = yield call(updateFieldById, props.id, props.field);
		yield put(actions.updateFieldsSuccess({ field: { name: team.name, description: team.description } }));
		NotificationManager.success(i18next.t('data_updated_succesful'), i18next.t('success'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('error_update_data'), i18next.t('error'), 4000);
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
		NotificationManager.error(i18next.t('error_add_users_to_team'), i18next.t('error'), 4000);
	}
}

function* deleteTeam(props: Props) {
	try {
		yield call(deleteTeamRequest, props.id);
		yield put(actions.deleteTeamSuccess());
		NotificationManager.info(i18next.t('team_has_been_deleted'), i18next.t('info'), 4000);
		history.push('/people');
	} catch (error) {
		NotificationManager.error(i18next.t('error_delete_team'), i18next.t('error'), 4000);
	}
}

function* removeUserFromTeam(props: RemoveUserFromTeam) {
	try {
		const team = yield call(removeUserFromTeamRequest, props.userId, props.teamId);
		yield put(actions.deletePeopleFromTeamSuccess({ users: team.users }));
		NotificationManager.info(i18next.t('user_has_been_removed'), i18next.t('info'), 4000);
	} catch (error) {
		NotificationManager.error(i18next.t('error_delete_user'), i18next.t('error'), 4000);
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

export function* watchDeletePeopleFromTeam() {
	yield takeEvery(actionTypes.DELETE_PEOPLE_FROM_TEAM_LOADING, removeUserFromTeam);
}

export default function* teamSaga() {
	yield all([
		watchStartLoading(),
		watchAddLinksLoading(),
		watchFieldUpdateLoading(),
		watchDeleteLinksLoading(),
		watchSearchPeopleLoading(),
		watchAddPeopleToTeam(),
		watchDeleteTeam(),
		watchDeletePeopleFromTeam(),
	]);
}
