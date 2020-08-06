import { CommonState } from './state';

export const FETCH_FILTER_DEFS = 'FILTER:FETCH_FILTER_DEFS';
export const UPDATE_COMMON_STATE_SUCCESS = 'FILTER:UPDATE_COMMON_STATE_SUCCESS';

export type UpdateStateSuccessArgs = {
	partialState: Partial<CommonState>;
};
