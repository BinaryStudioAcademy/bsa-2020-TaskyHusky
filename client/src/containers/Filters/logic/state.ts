export interface FilterState {
	filters: WebApi.Entities.Filter[];
	filterParts: WebApi.Entities.FilterPart[];
	recent: WebApi.Entities.Filter[];
	favorite: WebApi.Entities.Filter[];
	isLoading: boolean;
}

export const initialState: FilterState = {
	filters: [],
	filterParts: [],
	recent: [],
	favorite: [],
	isLoading: false,
};
