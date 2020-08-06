import callWebApi from '../helpers/callApi.helper';

export const getBoards = async (): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'board/',
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
