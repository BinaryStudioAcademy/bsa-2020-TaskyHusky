import { FilterState } from './state';

// export const UPDATE = 'EXAMPLE:UPDATE';
// export const TRIGGER_UPDATE_TEXT = 'EXAMPLE:TRIGGER_UPDATE_TEXT';
export const FETCH_FILTERS = 'FILTER:FETCH_FILTERS';

// export type UpdateExampleArgs = {
// 	partialState: Partial<ExampleState>;
// };

// export type GetExampleTextArgs = {
// 	exampleName: string;
// };

export type FetchFiltersArgs = {
	partialState: Partial<FilterState>;
};
