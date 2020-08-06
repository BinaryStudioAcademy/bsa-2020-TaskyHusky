export const START_LOADING = 'BOARDS:START_LOADING';
export const SUCCESS_LOADING = 'BOARDS:SUCCESS_LOADING';
export const FAIL_LOADING = 'BOARDS:FAIL_LOADING';
export const DELETE_BOARD = 'BOARDS:DELETE_BOARD';

export type successLoading = {
	boards: WebApi.Board.IBoardModel[];
};

export type deleteBoard = {
	id: string;
};
