export interface CommonState {
	filterDefs: WebApi.Entities.FilterDefinition[];
}

export const initialState: CommonState = {
	filterDefs: [],
};
