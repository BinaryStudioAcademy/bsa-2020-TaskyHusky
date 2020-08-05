import callWebApi from 'helpers/callApi.helper';

export const getUserByEmail = async (email: string) => {
	const res = await callWebApi({
		endpoint: `user/byEmail/${email}`,
		method: 'GET',
	});

	const text = await res.text();
	return text;
};
