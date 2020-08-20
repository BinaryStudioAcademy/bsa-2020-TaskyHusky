import callWebApi from 'helpers/callApi.helper';
import { createBoard as createBoardType } from '../containers/Boards/logic/actionTypes';

const getBoard = async (id: string): Promise<WebApi.Result.BoardResult> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `board/${id}`,
	});

	return (await res.json()) as WebApi.Result.BoardResult;
};

const getColumns = async (id: string): Promise<WebApi.Result.BoardColumnResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `board/${id}/columns`,
	});

	return (await res.json()) as WebApi.Result.BoardColumnResult[];
};

export const getBoardById = async (id: string): Promise<WebApi.Result.ComposedBoardResult> => {
	const board: WebApi.Result.BoardResult = await getBoard(id);
	const columns: WebApi.Result.BoardColumnResult[] = await getColumns(id);

	const composedBoard: WebApi.Result.ComposedBoardResult = {
		...board,
		columns,
	};

	return composedBoard;
};

export const getBoards = async (): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'board/',
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};

export const getRecentBoards = async (): Promise<WebApi.Board.IReducedBoard[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'board/recent',
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IReducedBoard[];
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

export const getBoardSprints = async (id: string): Promise<WebApi.Entities.Sprint[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `board/${id}/sprints`,
	});

	return (await res.json()) as WebApi.Entities.Sprint[];
};

export const getBoardProjects = async (id: string): Promise<WebApi.Entities.Projects[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `board/${id}/projects`,
	});

	return await res.json();
};
