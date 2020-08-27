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

	return (await res.json()) as WebApi.Entities.UserProfile;
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
		body: { oldPassword, newPassword },
		skipAuthorization: false,
	});

	return await res.json();
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

export const getPeople = async (): Promise<Partial<WebApi.Entities.UserProfile>> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/teammates`,
	});

	return (await res.json()) as Promise<Partial<WebApi.Entities.UserProfile>>;
};
