import callWebApi from '../helpers/callApi.helper';
import { createBoard as createBoardType } from '../containers/Boards/logic/actionTypes';

export const getBoards = async (): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'board/',
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};

export const getRecentBoards = async (): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'board/recent',
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};

export const deleteBoard = async (id: string): Promise<any> => {
	const res: Response = await callWebApi({
		method: 'DELETE',
		endpoint: `board/${id}`,
		skipAuthorization: false,
	});

	return await res.json();
};

export const createBoard = async (board: createBoardType): Promise<any> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: `board`,
		skipAuthorization: false,
		body: {
			...board,
		},
	});

	return await res.json();
};
