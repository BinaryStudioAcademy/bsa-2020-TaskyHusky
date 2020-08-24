import callWebApi from 'helpers/callApi.helper';

export const getNotifications = async (userId: string): Promise<WebApi.Entities.Notification[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `user/notification/byUser/${userId}`,
	});

	return (await res.json()) as WebApi.Entities.Notification[];
};
