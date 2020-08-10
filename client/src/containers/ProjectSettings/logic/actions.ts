import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startDeleting = createAction(actionTypes.START_DELETING);
export const SuccessDeleting = createAction<actionTypes.SuccessDeleting>(actionTypes.SUCCESS_DELETING);
export const failDeleting = createAction(actionTypes.FAIL_DELETING);

export const startGettingProject = createAction<actionTypes.StartGettingProject>(actionTypes.START_GETTING_PROJECT);
export const successGettingProject = createAction<actionTypes.SuccessGettingProject>(
	actionTypes.SUCCESS_GETTING_PROJECT,
);
export const failGettingProject = createAction(actionTypes.FAIL_GETTING_PROJECT);
