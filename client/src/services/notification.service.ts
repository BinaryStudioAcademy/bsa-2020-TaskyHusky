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
		endpoint: `user/notification/${id}/view`,
	});
};

export const unviewNotification = async (id: string): Promise<void> => {
	await callWebApi({
		method: 'PUT',
		endpoint: `user/notification/${id}/unview`,
	});
};

export const viewAllNotifications = async (): Promise<void> => {
	await callWebApi({
		method: 'PUT',
		endpoint: `user/notification/view`,
	});
};
