export interface FilterPartState {
	id: string;
	filterDef: WebApi.Entities.FilterDefinition;
	searchText: string;
	members: string[];
}

export interface AdvancedSearch {
	filterParts: FilterPartState[];
	addedFilterParts: FilterPartState[];
	issues: WebApi.Result.IssueResult[];
	filter?: WebApi.Entities.Filter;
}

export const initialState: AdvancedSearch = {
	filterParts: [],
	issues: [],
	addedFilterParts: [],
};
