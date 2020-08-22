export interface projectCommonState {
	isLoading: boolean;
	is404Error: boolean;
	isDeleted: boolean;
}

export const initialState: projectCommonState = {
	isLoading: false,
	is404Error: false,
	isDeleted: false,
};
