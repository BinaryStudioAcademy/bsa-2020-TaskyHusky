export const START_ADDING_USERS = 'PROJECT_PEOPLE:START_ADDING_USERS';
export const SUCCESS_ADDING_USERS = 'PROJECT_PEOPLE:SUCCESS_ADDING_USERS';
export const FAIL_ADDING_USERS = 'PROJECT_PEOPLE:FAIL_ADDING_USERS';

export type AddingUsers = {
	usersId: string[];
	project: WebApi.Entities.Projects;
	people: WebApi.Entities.UserProfile[];
};

export const START_DELETING_USERS = 'PROJECT_PEOPLE:START_DELETING_USERS';
export const SUCCESS_DELETING_USERS = 'PROJECT_PEOPLE:SUCCESS_DELETING_USERS';
export const FAIL_DELETING_USERS = 'PROJECT_PEOPLE:FAIL_DELETING_USERS';

export type UpdatingUsers = {
	usersId: string | string[];
	projectId: string;
};

export type DeletingUsers = {
	usersId: string;
	project: WebApi.Entities.Projects;
};

export const START_GETTING_PEOPLE = 'PROJECT_PEOPLE:START_GETTING_PEOPLE';
export const SUCCESS_GETTING_PEOPLE = 'PROJECT_PEOPLE:SUCCESS_GETTING_PEOPLE';
export const FAIL_GETTING_PEOPLE = 'PROJECT_PEOPLE:FAIL_GETTING_PEOPLE';

export type UserPeople = {
	people: WebApi.Entities.UserProfile[];
};
