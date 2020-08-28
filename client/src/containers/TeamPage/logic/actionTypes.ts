import { Team } from './state';

export const LOADING = 'TEAM:LOADING';
export const START_LOADING = 'TEAM:START_LOADING';
export const SUCCESS_TEAM_LOADING = 'TEAM:SUCCESS_TEAM_LOADING';
export const SUCCESS_TEAM_USERS_LOADING = 'TEAM:SUCCESS_TEAM_USERS_LOADING';
export const SUCCESS_TEAM_PROJECTS_LOADING = 'TEAM:SUCCESS_TEAM_PROJECTS_LOADING';
export const FAIL_LOADING = 'TEAM:FAIL_LOADING';

export const ADD_LINK_LOADING = 'TEAM:ADD_LINK_LOADING';
export const ADD_LINK_SUCCESS = 'TEAM:ADD_LINK_SUCCESS';

export const DELETE_LINK_LOADING = 'TEAM:DELETE_LINK_LOADING';
export const DELETE_LINK_SUCCESS = 'TEAM:DELETE_LINK_SUCCESS';

export const UPDATE_LINK_FIELD_SUCCESS = 'TEAM:UPDATE_LINK_FIELD_SUCCESS';
export const UPDATE_FIELD_LOADING = 'TEAM:UPDATE_FIELD_LOADING';
export const UPDATE_FIELD_SUCCESS = 'TEAM:UPDATE_FIELD_SUCCESS';

export const START_SEARCHING_PEOPLE = 'TEAM:START_SEARCHING_PEOPLE';
export const SUCCESS_SEARCHING_PEOPLE = 'TEAM:SUCCESS_SEARCHING_PEOPLE';
export const SEARCH_PEOPLE_LOADER = 'TEAM:SEARCH_PEOPLE_LOADER';
export const FAIL_SEARCHING_PEOPLE = 'TEAM:FAIL_SEARCHING_PEOPLE';

export const CLEAR_FOUND_USERS = 'TEAM:CLEAR_FOUND_USERS';
export const CLEAR_FOUND_USERS_DONE = 'TEAM:CLEAR_FOUND_USERS_DONE';

export const ADD_PEOPLE_TO_TEAM_LOADING = 'TEAM:ADD_PEOPLE_TO_TEAM_LOADING';
export const ADD_PEOPLE_TO_TEAM_SUCCESS = 'TEAM:ADD_PEOPLE_TO_TEAM_SUCCESS';

export const DELETE_PEOPLE_FROM_TEAM_LOADING = 'TEAM:DELETE_PEOPLE_FROM_TEAM_LOADING';
export const DELETE_PEOPLE_FROM_TEAM_SUCCESS = 'TEAM:DELETE_PEOPLE_FROM_TEAM_SUCCESS';

export const DELETE_TEAM_LOADING = 'TEAM:DELETE_TEAM_LOADING';
export const DELETE_TEAM_SUCCESS = 'TEAM:DELETE_TEAM_SUCCESS';

export type startAddingUsers = {
	id: string;
	users: WebApi.Entities.UserProfile[];
};

export type successAddingUsers = {
	users: WebApi.Entities.UserProfile[];
};

export type startsearchingPeople = {
	id: string;
	match: string;
};

export type successSearchPeople = {
	results: any; //semantic-ui structure for result render
	loading?: boolean;
};

export type AddLinkSuccess = {
	links?: any;
	id?: string;
};

export type FetchLinksLoading = {
	link?: {
		id?: string;
		name?: string;
		description?: string;
	};
	id?: string;
};

export type SuccessLoadingTeam = {
	team: Team;
	loading?: boolean;
};

export type SuccessLoadingUsers = {
	createdBy: WebApi.Entities.UserProfile;
	users?: WebApi.Entities.UserProfile[];
	loading?: boolean;
};

export type SuccessLoadingProjects = {
	projects?: WebApi.Entities.Projects[];
	loading?: boolean;
};

export type StartLoadingArgs = {
	id: string;
};

export type EditFieldLoadingArgs = {
	id: string;
	field: { [key: string]: string | [] };
};

export type EditFieldSuccess = {
	field: { [key: string]: string | [] };
};

export type DeleteTeamLoading = {
	id: string;
}

export type DeletePeopleLoading = {
	teamId: string;
	userId: string;
}

export type DeletePeopleSuccess = {
	users: WebApi.Entities.UserProfile[];
}