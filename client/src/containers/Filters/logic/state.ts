export interface FilterState {
	filters: WebApi.Entities.Filter[];
	filterParts: WebApi.Entities.FilterPart[];
}

export const initialState: FilterState = {
	filters: [],
	filterParts: [],
};
