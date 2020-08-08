import callWebApi from '../helpers/callApi.helper';

export const fetchPeople = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'fake/people',
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};
