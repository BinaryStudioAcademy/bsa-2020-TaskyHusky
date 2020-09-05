import callWebApi from 'helpers/callApi.helper';

export const createBoardColumn = async (
	data: WebApi.Board.CreateBoardColumn,
): Promise<WebApi.Result.BoardColumnResult> => {
	const res: Response = await callWebApi({
		endpoint: 'board/column',
		body: data,
		method: 'POST',
	});

	return (await res.json()) as WebApi.Result.BoardColumnResult;
};

export const updateBoardColumn = async (id: string, data: Partial<WebApi.Board.CreateBoardColumn>): Promise<void> => {
	await callWebApi({
		endpoint: `board/column/${id}`,
		body: data,
		method: 'PUT',
	});
};

export const deleteBoardColumn = async (id: string): Promise<void> => {
	await callWebApi({
		endpoint: `board/column/${id}`,
		method: 'DELETE',
	});
};
