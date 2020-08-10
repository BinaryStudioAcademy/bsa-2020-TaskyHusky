export const START_DELETING = 'PROJECTS:START_DELETING';
export const SUCCESS_DELETING = 'PROJECTS:SUCCESS_DELETING';
export const FAIL_DELETING = 'PROJECTS:FAIL_DELETING';

export type SuccessDeleting = {
	projects: WebApi.Entities.Projects[];
};

export const START_GETTING_PROJECT = 'PROJECTS:START_GETTING_PROJECT';
export const SUCCESS_GETTING_PROJECT = 'PROJECTS:SUCCESS_GETTING_PROJECT';
export const FAIL_GETTING_PROJECT = 'PROJECTS:FAIL_GETTING_PROJECT';

export type SuccessGettingProject = {
	project: WebApi.Entities.Projects;
};

export type StartGettingProject = {
	id: string;
};
