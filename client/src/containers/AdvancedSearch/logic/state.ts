export interface FilterPartState {
	id: string;
	filterDef: WebApi.Entities.FilterDefinition;
	searchText: string;
	members: string[];
}

export interface AdvancedSearch {
	filterParts: FilterPartState[];
	addedFilterParts: FilterPartState[];
	issues: WebApi.Entities.Issue[];
	filter?: WebApi.Entities.Filter;
	isFilterEdited: boolean;
}

export const initialState: AdvancedSearch = {
	filterParts: [],
	issues: [],
	addedFilterParts: [],
	isFilterEdited: false,
};
