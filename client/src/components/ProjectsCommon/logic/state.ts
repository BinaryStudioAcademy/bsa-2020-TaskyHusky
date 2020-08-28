export interface projectCommonState {
	isLoading: boolean;
	is404Error: boolean;
}

export const initialState: projectCommonState = {
	isLoading: false,
	is404Error: false,
};
