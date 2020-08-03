import callWebApi from 'helpers/callApi.helper';

export const registerUser = async (email: string, password: string): Promise<WebApi.Results.UserAuthResult | null> => {
	const res = await callWebApi({
		endpoint: 'auth/register',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

	if (res.status > 399) {
		// Replace this with error handling (when there will be a handler on server)
		return null;
	}

	return (await res.json()) as WebApi.Results.UserAuthResult;
};
