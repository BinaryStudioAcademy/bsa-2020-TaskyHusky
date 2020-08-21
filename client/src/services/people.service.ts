import callWebApi from '../helpers/callApi.helper';

export const fetchPeople = async (id: string) => {
	console.log(`user/${id}/teammates`);
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/teammatesTemp`,
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
