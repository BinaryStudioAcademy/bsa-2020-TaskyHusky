import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { all, call, takeEvery } from 'redux-saga/effects';
import { addComment } from 'services/issue.service';

function* fetchPostComment(action: ReturnType<typeof actions.addComment>) {
	const { issueId, text } = action;
	yield call(addComment, issueId, text);
}

function* watchPostComment() {
	yield takeEvery(actionTypes.ADD_COMMENT, fetchPostComment);
}

export default function* issueCommentSaga() {
	yield all([watchPostComment()]);
}
