import * as actionTypes from './actionTypes';
import { ReportState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const reportReducer = createReducer<ReportState>(initialState, {
	[actionTypes.LOAD_SPRINT_SUCCESS](state, { sprint }) {
		return {
			...state,
			sprint,
		};
	},
});
