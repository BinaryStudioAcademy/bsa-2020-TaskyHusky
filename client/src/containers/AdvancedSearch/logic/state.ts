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
	filter?: WebApi.Entities.Filter | undefined;
	isFilterEdited: boolean;
	issuesCount: number;
	inputText: string;
	filterPartsLoaded: boolean;
}

export const initialState: AdvancedSearch = {
	filterParts: [],
	issues: [],
	addedFilterParts: [],
	isFilterEdited: false,
	issuesCount: 0,
	inputText: '',
	filterPartsLoaded: false,
};
