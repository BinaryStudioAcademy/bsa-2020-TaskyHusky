import { UserState } from 'containers/ProfilePage/logiс/state';
import callWebApi from 'helpers/callApi.helper';

export const requestGetUser = async (id: string): Promise<WebApi.Entities.User> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `user/${id}`,
	});

	return (await res.json()) as WebApi.Entities.User;
};

export const requestUpdateUser = async (userData: Partial<UserState>): Promise<WebApi.Entities.User> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: 'user/',
		body: userData,
		skipAuthorization: false,
	});

	return (await res.json()) as WebApi.Entities.User;
};
