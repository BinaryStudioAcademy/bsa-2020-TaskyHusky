import callWebApi from '../helpers/callApi.helper';

export const getInvites = async (id: string): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/incoming-invites`,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};

export const changeStatus = async ({
	userId,
	teammateId,
	status,
}: {
	userId: string;
	teammateId: string;
	status: string;
}): Promise<WebApi.Board.IBoardModel[]> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: `user/${userId}/incoming-invites`,
		skipAuthorization: false,
		body: {
			id: teammateId,
			status,
		},
	});

	return (await res.json()) as WebApi.Board.IBoardModel[];
};
