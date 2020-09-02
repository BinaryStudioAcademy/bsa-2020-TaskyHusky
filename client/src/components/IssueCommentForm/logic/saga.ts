import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { all, call, takeEvery } from 'redux-saga/effects';
import { addComment, deleteComment } from 'services/issue.service';

function* fetchPostComment(action: ReturnType<typeof actions.addComment>) {
	const { issueId, text } = action;
	yield call(addComment, issueId, text);
}

function* watchPostComment() {
	yield takeEvery(actionTypes.ADD_COMMENT, fetchPostComment);
}

function* fetchDeleteComment(action: ReturnType<typeof actions.deleteComment>) {
	yield call(deleteComment, action.id);
}

function* watchDeleteComment() {
	yield takeEvery(actionTypes.DELETE_COMMENT, fetchDeleteComment);
}

export default function* issueCommentSaga() {
	yield all([watchPostComment(), watchDeleteComment()]);
}
