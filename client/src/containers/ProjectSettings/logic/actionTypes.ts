export const START_GETTING_PROJECT = 'PROJECTS:START_GETTING_PROJECT';
export const SUCCESS_GETTING_PROJECT = 'PROJECTS:SUCCESS_GETTING_PROJECT';
export const FAIL_GETTING_PROJECT = 'PROJECTS:FAIL_GETTING_PROJECT';

export type SuccessGettingProject = {
	project: WebApi.Entities.Projects;
};

export const START_UPDATING_PROJECT = 'PROJECTS:START_UPDATING_PROJECT';
export const SUCCESS_UPDATING_PROJECT = 'PROJECTS:SUCCESS_UPDATING_PROJECT';
export const FAIL_UPDATING_PROJECT = 'PROJECTS:FAIL_UPDATING_PROJECT';
export const REQUEST_UPDATE_AVATAR = 'USER:REQUEST_UPDATE_AVATAR';

export type ProjectId = {
	id: string;
};

export type UpdatingProject = {
	project: WebApi.Entities.Projects;
};

export const UPDATE_PROJECT = 'PROJECTS:UPDATE_PROJECT';

export type RequestUpdateAvatar = {
	image: File;
	id: string;
};
