import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionType';

export const requestGetAssignedIssues = createAction<actionTypes.RequestGetAssignedIssues>(
	actionTypes.REQUEST_GET_ASSIGNED_ISSUES,
);

export const updateData = createAction<actionTypes.UpdateData>(actionTypes.UPDATE_DATA);
