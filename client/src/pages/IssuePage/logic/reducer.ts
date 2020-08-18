import { createReducer } from 'helpers/createReducer.helper';
import { initialState } from './initialState';
import * as actionTypes from './actionTypes';
import { IssueState } from './types';

export const issueReducer = createReducer<IssueState>(initialState, {
	[actionTypes.SET_TYPES](state, action: actionTypes.SetTypes): IssueState {
		return {
			...state,
			types: [...action.data],
		};
	},
	[actionTypes.SET_PRIORITIES](state, action: actionTypes.SetPriorities): IssueState {
		return {
			...state,
			priorities: [...action.data],
		};
	},
	[actionTypes.SET_STATUSES](state, action: actionTypes.SetStatuses): IssueState {
		return {
			...state,
			statuses: [...action.data],
		};
	},
});
