import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startGettingProject = createAction<actionTypes.ProjectId>(actionTypes.START_GETTING_PROJECT);
export const successGettingProject = createAction<actionTypes.SuccessGettingProject>(
	actionTypes.SUCCESS_GETTING_PROJECT,
);
export const failGettingProject = createAction(actionTypes.FAIL_GETTING_PROJECT);

export const startUpdatingProject = createAction<actionTypes.UpdatingProject>(actionTypes.START_UPDATING_PROJECT);
export const successUpdatingProject = createAction<actionTypes.UpdatingProject>(actionTypes.SUCCESS_UPDATING_PROJECT);
export const failUpdatingProject = createAction(actionTypes.FAIL_UPDATING_PROJECT);

export const updateProject = createAction<actionTypes.UpdatingProject>(actionTypes.UPDATE_PROJECT);
