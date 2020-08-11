import callWebApi from 'helpers/callApi.helper';

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
