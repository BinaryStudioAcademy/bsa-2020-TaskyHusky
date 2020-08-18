import { FilterPartState } from '../../AdvancedSearch/logic/state';
export const OPEN_MODAL = 'CREATE_FILTER:OPEN_MODAL';
export const CLOSE_MODAL = 'CREATE_FILTER:CLOSE_MODAL';
export const START_SAVING_FILTER = 'CREATE_FILTER:START_SAVING_FILTER';
export const SUCCESS_SAVING_FILTER = 'CREATE_FILTER:SUCCESS_SAVING_FILTER';
export const FAIL_SAVING_FILTER = 'CREATE_FILTER:FAIL_SAVING_FILTER';
export const RESET_STATE = 'CREATE_FILTER:RESET_STATE';
export const REDIRECTING = 'CREATE_FILTER:REDIRECTING';

export type InitialFilter = {
	name: string;
	owner: string;
	filterParts: FilterPartState[];
};

export type FilterSaveSuccessArgs = {
	id: string;
};

export type RedirectingArgs = {
	redirecting: boolean;
};
