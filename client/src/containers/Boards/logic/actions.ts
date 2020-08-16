import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction(actionTypes.START_LOADING);
export const getRecentBoards = createAction(actionTypes.GET_RECENT_BOARDS);
export const successGetRecentBoards = createAction<actionTypes.successGetRecentBoards>(
	actionTypes.SUCCESS_GET_RECENT_BOARDS,
);
export const successLoading = createAction<actionTypes.successLoading>(actionTypes.SUCCESS_LOADING);
export const failLoading = createAction(actionTypes.FAIL_LOADING);

export const deleteBoard = createAction<actionTypes.deleteBoard>(actionTypes.DELETE_BOARD);
export const createBoard = createAction<actionTypes.createBoard>(actionTypes.CREATE_BOARD);
