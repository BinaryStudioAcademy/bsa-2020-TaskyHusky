import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction(actionTypes.START_LOADING);
export const SuccessLoading = createAction<actionTypes.ProjectsList>(actionTypes.SUCCESS_LOADING);
export const failLoading = createAction(actionTypes.FAIL_LOADING);
export const updateProjects = createAction<actionTypes.ProjectsList>(actionTypes.UPDATE_PROJECTS_LIST);
export const startLoadingRecent = createAction(actionTypes.START_LOADING_RECENT);
export const successLoadingRecent = createAction<actionTypes.ProjectsList>(actionTypes.SUCCESS_LOADING_RECENT);
