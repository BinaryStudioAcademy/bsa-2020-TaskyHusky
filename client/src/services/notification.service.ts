import callWebApi from 'helpers/callApi.helper';

export const getNotifications = async (): Promise<WebApi.Result.NotificationResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `user/notification`,
	});

	return (await res.json()) as WebApi.Result.NotificationResult[];
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
