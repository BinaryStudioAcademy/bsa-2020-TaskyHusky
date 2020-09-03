export const START_ADDING_LABEL = 'PROJECT_LABEL:START_ADDING_LABEL';
export const SUCCESS_ADDING_LABEL = 'PROJECT_LABEL:SUCCESS_ADDING_LABEL';
export const FAIL_ADDING_LABEL = 'PROJECT_LABEL:FAIL_ADDING_LABEL';

export const START_UPDATING_LABEL = 'PROJECT_LABEL:START_UPDATING_LABEL';
export const SUCCESS_UPDATING_LABEL = 'PROJECT_LABEL:SUCCESS_UPDATING_LABEL';
export const FAIL_UPDATING_LABEL = 'PROJECT_LABEL:FAIL_UPDATING_LABEL';

export const START_DELETING_LABEL = 'PROJECT_LABEL:START_DELETING_LABEL';
export const SUCCESS_DELETING_LABEL = 'PROJECT_LABEL:SUCCESS_DELETING_LABEL';
export const FAIL_DELETING_LABEL = 'PROJECT_LABEL:FAIL_DELETING_LABEL';

export const OPEN_MODAL = 'PROJECT_LABEL:OPEN_MODAL';
export const OPEN_EDIT_MODAL = 'PROJECT_LABEL:OPEN_EDIT_MODAL';
export const CLOSE_MODAL = 'PROJECT_LABEL:CLOSE_MODAL';

export type InitialLabel = {
	text: string;
	textColor: string;
	backgroundColor: string;
};

export interface Label {
	project: WebApi.Entities.Projects;
	label: InitialLabel;
}

export interface EditLabel {
	editLabel: WebApi.Entities.ProjectLabel;
}

export interface DeleteLabel {
	projectId: string;
	labelId: string;
}
