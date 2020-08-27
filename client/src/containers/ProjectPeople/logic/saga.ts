import * as projectSettingsActions from './../../ProjectSettings/logic/actions';
import { getPeople } from 'services/user.service';
import { updateProjectUsersList } from 'services/projects.service';
import { NotificationManager } from 'react-notifications';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* addUsers({ usersId, project, people }: ReturnType<typeof actions.startAddingUsers>) {
	try {
		const addedUsers = people.filter((user) => usersId.some((id) => id === user.id));
		const users = [...project.users, ...addedUsers];
		const updateProject = { ...project, users };
		yield put(projectSettingsActions.updateProject({ project: updateProject }));
		yield call(updateProjectUsersList, { usersId, projectId: project.id });
	} catch (error) {
		yield put(actions.failAddingUsers());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchStartAddingUsers() {
	yield takeEvery(actionTypes.START_ADDING_USERS, addUsers);
}

export function* deleteUser({ usersId, project }: ReturnType<typeof actions.startDeletingUser>) {
	try {
		yield call(updateProjectUsersList, { usersId, projectId: project.id });
		yield put(actions.successDeletingUser());

		const users = project.users.filter((user) => user.id !== usersId);
		const updateProject = { ...project, users };
		yield put(projectSettingsActions.updateProject({ project: updateProject }));
	} catch (error) {
		yield put(actions.failDeletingUser());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchStartDeletingUsers() {
	yield takeEvery(actionTypes.START_DELETING_USERS, deleteUser);
}

export function* getUserPeople(projectData: ReturnType<typeof actions.startDeletingUser>) {
	try {
		const { teammates: people } = yield call(getPeople);
		yield put(actions.successGettingPeople({ people }));
	} catch (error) {
		yield put(actions.failGettingPeople());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchStartGettingUserPeople() {
	yield takeEvery(actionTypes.START_GETTING_PEOPLE, getUserPeople);
}

export default function* projectPeopleSaga() {
	yield all([watchStartAddingUsers(), watchStartDeletingUsers(), watchStartGettingUserPeople()]);
}
