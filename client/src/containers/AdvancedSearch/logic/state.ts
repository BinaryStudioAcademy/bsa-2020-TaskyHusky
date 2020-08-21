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
	issuesCount: number;
}

export const initialState: AdvancedSearch = {
	filterParts: [],
	issues: [],
	addedFilterParts: [],
	isFilterEdited: false,
	issuesCount: 0,
};
