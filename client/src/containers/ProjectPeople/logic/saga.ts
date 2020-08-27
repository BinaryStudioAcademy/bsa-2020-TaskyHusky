import { getPeople } from 'services/user.service';
import { updateProjectUsersList } from 'services/projects.service';
import { NotificationManager } from 'react-notifications';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* addUsers(projectData: ReturnType<typeof actions.startAddingUsers>) {
	try {
		yield call(updateProjectUsersList, projectData);
		yield put(actions.successAddingUsers());
	} catch (error) {
		yield put(actions.failAddingUsers());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

export function* watchStartAddingUsers() {
	yield takeEvery(actionTypes.START_ADDING_USERS, addUsers);
}

export function* deleteUser(projectData: ReturnType<typeof actions.startDeletingUser>) {
	try {
		yield call(updateProjectUsersList, projectData);
		yield put(actions.successDeletingUser());
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
