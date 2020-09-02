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
