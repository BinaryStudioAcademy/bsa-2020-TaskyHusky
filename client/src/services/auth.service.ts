import callWebApi from 'helpers/callApi.helper';
import { User } from 'containers/LoginPage/logic/state';

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

export const getProfile = async (): Promise<User> => {
	const res = await callWebApi({
		endpoint: 'auth/profile',
		method: 'GET',
	});

	return (await res.json()) as User;
};

export const checkEmail = async (email: string): Promise<Partial<WebApi.Entities.UserProfile>> => {
	const res = await callWebApi({
		endpoint: 'auth/check_email',
		method: 'POST',
		body: { email },
	});

	return (await res.json()) as Partial<WebApi.Entities.UserProfile>;
};

export const googleAuthRequest = async (data: any) => {
	const res = await callWebApi({
		endpoint: 'auth/google',
		method: 'POST',
		body: { data },
	});
	return (await res.json()) as Partial<WebApi.Entities.UserProfile>;
}
