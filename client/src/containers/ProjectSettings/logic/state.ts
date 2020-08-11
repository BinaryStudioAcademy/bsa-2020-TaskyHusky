export type Project = {
	id: string;
	name: string;
	key: string;
	category: string;
	defaultAssigneeID: string;
	leadID: string;
	creatorID: string;
};

export interface ProjectState {
	project: Project;
	isLoading: boolean;
}

export const initialState: ProjectState = {
	project: {
		id: '',
		name: '',
		key: '',
		category: '',
		defaultAssigneeID: '',
		leadID: '',
		creatorID: '',
	},
	isLoading: true,
};
