export interface FilterDefsState {
	filterDefs: WebApi.Entities.FilterDefinition[];
	isLoading: boolean;
}

export const initialState: FilterDefsState = {
	filterDefs: [],
	isLoading: true,
};
