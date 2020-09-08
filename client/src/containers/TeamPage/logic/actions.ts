import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const spinner = createAction(actionTypes.SET_IS_LOADING);
export const startLoading = createAction<actionTypes.StartLoadingArgs>(actionTypes.START_LOADING);
export const updateTeam = createAction<actionTypes.SuccessLoadingTeam>(actionTypes.SUCCESS_TEAM_LOADING);
export const updateUsers = createAction<actionTypes.SuccessLoadingUsers>(actionTypes.SUCCESS_TEAM_USERS_LOADING);
export const updateProjects = createAction<actionTypes.SuccessLoadingProjects>(
	actionTypes.SUCCESS_TEAM_PROJECTS_LOADING,
);
export const updateIssues = createAction<actionTypes.SuccessLoadingIssues>(actionTypes.SUCCESS_TEAM_ISSUES_LOADING);

export const failLoading = createAction(actionTypes.FAIL_LOADING);

export const addLinkLoading = createAction<actionTypes.FetchLinksLoading>(actionTypes.ADD_LINK_LOADING);
export const deleteLinkLoading = createAction<actionTypes.FetchLinksLoading>(actionTypes.DELETE_LINK_LOADING);
export const updateLinkFieldsSuccess = createAction<actionTypes.AddLinkSuccess>(actionTypes.UPDATE_LINK_FIELD_SUCCESS);

export const updateFieldsLoading = createAction<actionTypes.EditFieldLoadingArgs>(actionTypes.UPDATE_FIELD_LOADING);
export const updateFieldsSuccess = createAction<actionTypes.EditFieldSuccess>(actionTypes.UPDATE_FIELD_SUCCESS);

export const searchPeopleLoader = createAction(actionTypes.SEARCH_PEOPLE_LOADER);
export const startSearchPeople = createAction<actionTypes.startsearchingPeople>(actionTypes.START_SEARCHING_PEOPLE);
export const successSearchPeople = createAction<actionTypes.successSearchPeople>(actionTypes.SUCCESS_SEARCHING_PEOPLE);
export const failSearchPeople = createAction(actionTypes.FAIL_SEARCHING_PEOPLE);

export const clearResults = createAction(actionTypes.CLEAR_FOUND_USERS);
export const clearResultsDone = createAction(actionTypes.CLEAR_FOUND_USERS_DONE);

export const addPeopleToTeamLoading = createAction<actionTypes.startAddingUsers>(
	actionTypes.ADD_PEOPLE_TO_TEAM_LOADING,
);
export const addPeopleToTeamDone = createAction<actionTypes.successAddingUsers>(actionTypes.UPDATE_TEAM_USERS_SECCESS);

export const deletePeopleFromTeamLoading = createAction<actionTypes.DeletePeopleLoading>(
	actionTypes.DELETE_PEOPLE_FROM_TEAM_LOADING,
);
export const deletePeopleFromTeamSuccess = createAction<actionTypes.successAddingUsers>(
	actionTypes.UPDATE_TEAM_USERS_SECCESS,
);

export const deleteTeamLoading = createAction<actionTypes.DeleteTeamLoading>(actionTypes.DELETE_TEAM_LOADING);
export const deleteTeamSuccess = createAction(actionTypes.DELETE_TEAM_SUCCESS);
