import callWebApi from 'helpers/callApi.helper';

export const registerUser = async (settings: Partial<WebApi.Entities.UserProfile>) => {
	const res = await callWebApi({
		endpoint: 'auth/register',
		method: 'POST',
		body: {
			...settings,
		},
	});

	return (await res.json()) as WebApi.Result.UserAuthResult;
};

export const loginUser = async (email: string, password: string): Promise<WebApi.Result.UserAuthResult | null> => {
	const res = await callWebApi({
		endpoint: 'auth/login',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

	return (await res.json()) as WebApi.Result.UserAuthResult;
};
