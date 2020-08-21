import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startDeletingProject = createAction<actionTypes.ProjectId>(actionTypes.START_DELETING_PROJECT);
export const successDeletingProject = createAction(actionTypes.SUCCESS_DELETING_PROJECT);
export const failDeletingProject = createAction(actionTypes.FAIL_DELETING_PROJECT);

export const resetProjectDeletingState = createAction(actionTypes.RESET_STATE);
