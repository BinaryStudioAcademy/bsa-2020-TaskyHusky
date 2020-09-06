import { createReducer } from 'helpers/createReducer.helper';
import { BoardColumnState, initialState } from './state';
import * as actionTypes from './actionTypes';

export const boardColumnReducer = createReducer<BoardColumnState>(initialState, {
	[actionTypes.SET_CREATED_COLUMN](state, action: actionTypes.SetCreatedColumn) {
		return {
			...state,
			columnCreated: action.created,
			recentlyCreatedColumn: action.column,
		};
	},
});
