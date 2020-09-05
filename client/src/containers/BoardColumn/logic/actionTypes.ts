export const CREATE_COLUMN = 'BOARD:COLUMN:CREATE';
export const SET_CREATED_COLUMN = 'BOARD:COLUMN:CREATE:STATUS:SET';
export const UPDATE_COLUMN = 'BOARD:COLUMN:UPDATE';

export type CreateColumn = {
	data: WebApi.Board.CreateBoardColumn;
};

export type SetCreatedColumn = {
	created: boolean;
	column?: WebApi.Result.BoardColumnResult;
};

export type UpdateColumn = {
	id: string;
	data: Partial<WebApi.Board.CreateBoardColumn>;
};
