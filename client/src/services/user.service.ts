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
		endpoint: 'user/changepass',
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
