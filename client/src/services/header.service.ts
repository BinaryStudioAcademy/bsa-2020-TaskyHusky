import callWebApi from '../helpers/callApi.helper';

export const getInvites = async (id: string): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/incoming-invites`,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};
