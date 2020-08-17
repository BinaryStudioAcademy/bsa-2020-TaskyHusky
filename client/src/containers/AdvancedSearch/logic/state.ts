export interface FilterPartState {
	id: string;
	filterDef: WebApi.Entities.FilterDefinition;
	searchText: string;
	members: string[];
}

export interface AdvancedSearch {
	filterParts: FilterPartState[];
	issues: WebApi.Result.IssueResult[];
}

export const initialState: AdvancedSearch = {
	filterParts: [],
	issues: [],
};
