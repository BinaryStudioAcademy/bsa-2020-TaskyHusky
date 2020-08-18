import callWebApi from '../helpers/callApi.helper';
import { modifiedEntity } from '../containers/SearchPeopleAndTeamField/logic/state';

export const fetchPeople = async (id: string) => {
	console.log(`user/${id}/teammates`);
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/teammatesTemp`,
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};

export const fetchPeopleByFullNameFilter = async (
	name: string | undefined,
): Promise<modifiedEntity<WebApi.Entities.UserProfile>[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'user',
		query: {
			name,
		},
	});

	const people = (await res.json()) as WebApi.Entities.UserProfile[];

	return people.map((user) => ({ data: user, title: '', key: user.id }));
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
