export interface SaveFilterState {
	isLoading: boolean;
	isModalOpened: boolean;
	isFilterSaved: boolean;
}

export const initialState: SaveFilterState = {
	isLoading: false,
	isModalOpened: false,
	isFilterSaved: false,
};
