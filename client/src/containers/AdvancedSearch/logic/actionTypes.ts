import { AdvancedSearch } from './state';

export const FETCH_FILTER_PARTS = 'SEARCH:FETCH_FILTER_PARTS';
export const UPDATE_SEARCH_SUCCESS = 'SEARCH:UPDATE_SEARCH_SUCCESS';

export type UpdateSearchArgs = {
	partialState: Partial<AdvancedSearch>;
};

export type FetchFilterParts = {
	filterDefs: Partial<WebApi.Entities.FilterDefinition[]>;
};
