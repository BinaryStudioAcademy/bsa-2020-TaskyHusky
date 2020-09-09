import { boardTypes } from '../../../typings/boardTypes';

export const START_LOADING = 'BOARDS:START_LOADING';
export const SUCCESS_LOADING = 'BOARDS:SUCCESS_LOADING';
export const GET_RECENT_BOARDS = 'BOARDS:GET_RECENT_BOARDS';
export const SUCCESS_GET_RECENT_BOARDS = 'BOARDS:SUCCESS_GET_RECENT_BOARDS';
export const FAIL_LOADING = 'BOARDS:FAIL_LOADING';
export const DELETE_BOARD = 'BOARDS:DELETE_BOARD';
export const CREATE_BOARD = 'BOARDS:CREATE_BOARD';

export type BoardColumnToCreate = {
	columnName: string;
	status: string;
	index: number;
	isResolutionSet: boolean;
};

export type successLoading = {
	boards: WebApi.Board.IBoardModel[];
};

export type successGetRecentBoards = {
	recentBoards: WebApi.Board.IReducedBoard[];
};

export type deleteBoard = {
	id: string;
};

export type createBoard = {
	boardType: boardTypes;
	name: string;
	createdBy: {
		id: string;
	};
	columns?: BoardColumnToCreate[];
};
