import callWebApi from '../helpers/callApi.helper';

export const fetchPeople = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'user',
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};

export const fetchPeopleByFullNameFilter = async (name: string | undefined) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'user',
		query: {
			name,
		},
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};
