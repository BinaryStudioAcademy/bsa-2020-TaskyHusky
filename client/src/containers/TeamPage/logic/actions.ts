import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const spinner = createAction(actionTypes.LOADING);
export const startLoading = createAction<actionTypes.StartLoadingArgs>(actionTypes.START_LOADING);
export const updateTeam = createAction<actionTypes.SuccessLoadingTeam>(actionTypes.SUCCESS_TEAM_LOADING);
export const updateUsers = createAction<actionTypes.SuccessLoadingUsers>(actionTypes.SUCCESS_TEAM_USERS_LOADING);
export const updateProjects = createAction<actionTypes.SuccessLoadingProjects>(
	actionTypes.SUCCESS_TEAM_PROJECTS_LOADING,
);

export const failLoading = createAction(actionTypes.FAIL_LOADING);

export const addLinkLoading = createAction<actionTypes.FetchLinksLoading>(actionTypes.ADD_LINK_LOADING);
export const deleteLinkLoading = createAction<actionTypes.FetchLinksLoading>(actionTypes.DELETE_LINK_LOADING);
export const updateLinkFieldsSuccess = createAction<actionTypes.AddLinkSuccess>(actionTypes.UPDATE_LINK_FIELD_SUCCESS);

export const updateFieldsLoading = createAction<actionTypes.EditFieldLoadingArgs>(actionTypes.UPDATE_FIELD_LOADING);
export const updateFieldsSuccess = createAction<actionTypes.EditFieldSuccess>(actionTypes.UPDATE_FIELD_SUCCESS);
