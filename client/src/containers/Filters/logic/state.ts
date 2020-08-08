export interface FilterState {
	filters: WebApi.Entities.Filter[];
	filterParts: WebApi.Entities.FilterPart[];
	filterDefs: WebApi.Entities.FilterDefinition[];
}

export const initialState: FilterState = {
	filters: [],
	filterParts: [],
	filterDefs: [],
};
