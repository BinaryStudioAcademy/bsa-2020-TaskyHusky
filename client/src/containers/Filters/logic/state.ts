export interface FilterState {
	filters: WebApi.Entities.Filter[];
	filterParts: WebApi.Entities.FilterPart[];
	isLoading: boolean;
}

export const initialState: FilterState = {
	filters: [],
	filterParts: [],
	isLoading: false,
};
