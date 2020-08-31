import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionType';

export const requestGetIssues = createAction<actionTypes.RequestGetIssues>(
	actionTypes.REQUEST_GET_ISSUES,
);

export const updateData = createAction<actionTypes.UpdateData>(actionTypes.UPDATE_DATA);
