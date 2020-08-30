import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import callWebApi from 'helpers/callApi.helper';

export const requestGetUser = async (id: string): Promise<WebApi.Entities.UserProfile> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}`,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Entities.UserProfile;
};

export const requestSendEmailResetLink = async (email: string) => {
	const res = await callWebApi({
		endpoint: 'user/reset-email',
		method: 'POST',
		body: { email },
	});

	return (await res.json()) as Partial<WebApi.Entities.UserProfile>;
};

export const requestUdateAvatar = async (image: File): Promise<WebApi.Entities.UserProfile> => {
	const res = await callWebApi({
		method: 'POST',
		endpoint: `user/avatar`,
		skipAuthorization: false,
		attachment: image,
	});

	return (await res.json()) as WebApi.Entities.UserProfile;
};

export const requestGetUserProjects = async (id: string): Promise<any> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/projects/${id}`,
		skipAuthorization: false,
	});
	return (await res.json()) as Array<WebApi.Entities.Projects>;
};

export const requestGetUserTeams = async (id: string): Promise<any> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/teams/${id}`,
		skipAuthorization: false,
	});
	return (await res.json()) as Array<WebApi.Entities.Team>;
};

export const requestUpdateUser = async (userData: Partial<UserProfileState>): Promise<WebApi.Entities.UserProfile> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: 'user/',
		body: userData,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Entities.UserProfile;
};

export const requestChangePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: 'user/password',
		body: { oldPassword, password: newPassword },
		skipAuthorization: false,
	});

	return await res.json();
};

export const requestChangeEmail = async (
	password: string,
	email: string,
	token: string,
): Promise<Partial<UserProfileState>> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: `user/email/${token}`,
		body: { email, password },
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Entities.UserProfile;
};

export const requestDeleteUser = async (): Promise<void> => {
	await callWebApi({
		method: 'DELETE',
		endpoint: 'user/',
		skipAuthorization: false,
	});
};

export const requestAllUsers = async (): Promise<WebApi.Entities.UserProfile[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user`,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};

export const requestTeammates = async (id: string): Promise<WebApi.Entities.UserProfile[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}/teammates`,
	});

	return (await res.json()) as WebApi.Entities.UserProfile[];
};
