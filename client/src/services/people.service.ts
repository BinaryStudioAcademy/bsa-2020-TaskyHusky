import callWebApi from '../helpers/callApi.helper';

export const fetchPeople = async (id: string) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/teammates`,
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};

export const createInvite = async ({ userId, email }: { userId: string; email: string }) => {
	await callWebApi({
		method: 'POST',
		endpoint: `user/${userId}/pending-invites`,
		skipAuthorization: false,
		body: {
			id: userId,
			email,
		},
	});
};

export const addTeam = async ({ userId, name }: { userId: string; name: string }) => {
	await callWebApi({
		method: 'POST',
		endpoint: `user/${userId}/pending-invites`,
		skipAuthorization: false,
		body: {
			createdBy: {
				id: userId,
			},
			name,
		},
	});
};
