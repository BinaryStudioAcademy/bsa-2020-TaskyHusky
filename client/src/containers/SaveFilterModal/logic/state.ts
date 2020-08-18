export interface SaveFilterState {
	isLoading: boolean;
	isModalOpened: boolean;
	savedFilterId: string;
	redirecting: boolean;
}

export const initialState: SaveFilterState = {
	isLoading: false,
	isModalOpened: false,
	savedFilterId: '',
	redirecting: false,
};
