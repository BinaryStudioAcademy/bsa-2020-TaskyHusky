import callWebApi from '../helpers/callApi.helper';

export const getBoards = async (): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await fetch('http://localhost:5000/api/board');

	return (await res.json()) as WebApi.Board.IBoardModel[];
};
