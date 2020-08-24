import callWebApi from 'helpers/callApi.helper';

export const getNotifications = async (): Promise<WebApi.Entities.Notification[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `user/notification`,
	});

	return (await res.json()) as WebApi.Entities.Notification[];
};

export const viewNotification = async (id: string): Promise<void> => {
	await callWebApi({
		method: 'PUT',
		endpoint: `user/notification/${id}`,
		body: {
			isViewed: true,
		},
	});
};
