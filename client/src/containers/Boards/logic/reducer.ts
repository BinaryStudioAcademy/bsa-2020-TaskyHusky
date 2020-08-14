import * as actionTypes from './actionTypes';
import { BoardsState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const boardReducer = createReducer<BoardsState>(initialState, {
	[actionTypes.SUCCESS_LOADING](state, boards) {
		return {
			...state,
			boards: boards.boards,
		};
	},
	[actionTypes.SUCCESS_GET_RECENT_BOARDS](state, recentBoards) {
		return {
			...state,
			recentBoards: recentBoards.recentBoards,
		};
	},
});
