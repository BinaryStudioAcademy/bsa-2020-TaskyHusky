export interface ProjectLabelState {
	isLoading: boolean;
	isModalOpen: boolean;
	isEditMode: boolean;
	editLabel?: WebApi.Entities.ProjectLabel;
	labelDeletingId: string;
}

export const initialState: ProjectLabelState = {
	isModalOpen: false,
	isLoading: false,
	isEditMode: false,
	editLabel: undefined,
	labelDeletingId: '',
};
