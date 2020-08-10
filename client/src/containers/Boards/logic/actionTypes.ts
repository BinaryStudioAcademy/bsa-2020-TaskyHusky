import { boardTypes } from '../../../components/CreateBoardModal/types';

export const START_LOADING = 'BOARDS:START_LOADING';
export const SUCCESS_LOADING = 'BOARDS:SUCCESS_LOADING';
export const FAIL_LOADING = 'BOARDS:FAIL_LOADING';
export const DELETE_BOARD = 'BOARDS:DELETE_BOARD';
export const CREATE_BOARD = 'BOARDS:CREATE_BOARD';

export type successLoading = {
	boards: WebApi.Board.IBoardModel[];
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
};
