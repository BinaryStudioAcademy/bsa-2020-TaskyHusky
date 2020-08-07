import { AdvancedSearch } from './state';

export const FETCH_FILTER_PARTS = 'SEARCH:FETCH_FILTER_PARTS';
export const UPDATE_SEARCH_SUCCESS = 'SEARCH:UPDATE_SEARCH_SUCCESS';

export type UpdateSearchArgs = {
	partialState: Partial<AdvancedSearch>;
};

// export type FetchFilterParts = {
// 	QUICK_FILTER_IDS: Partial<WebApi.Entities.FilterDefinition[]>;
// };
