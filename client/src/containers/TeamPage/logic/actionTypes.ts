import { Team } from './state';

export const START_LOADING = 'TEAM:START_LOADING';
export const SUCCESS_LOADING = 'TEAM:SUCCESS_LOADING';
export const FAIL_LOADING = 'TEAM:FAIL_LOADING';

export const ADD_LINK_LOADING = 'TEAM:ADD_LINK_LOADING';
export const ADD_LINK_SUCCESS = 'TEAM:ADD_LINK_SUCCESS';

export const DELETE_LINK_LOADING = 'TEAM:DELETE_LINK_LOADING';
export const DELETE_LINK_SUCCESS = 'TEAM:DELETE_LINK_SUCCESS';

export const UPDATE_FIELD_LOADING = 'TEAM:UPDATE_FIELD_LOADING';
export const UPDATE_FIELD_SUCCESS = 'TEAM:UPDATE_FIELD_SUCCESS';

export type AddLinkSuccess = {
	id: string;
	link: {
		name?: string;
		http?: string;
		description?: string;
	};
};

export type SuccessLoading = {
	team: Team[];
};

export type StartLoadingArgs = {
	id: string;
};

export type EditFieldLoadingArgs = {
	id: string;
	field: any;
};
