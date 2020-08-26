export interface NotificationsState {
	notifications: WebApi.Result.NotificationResult[];
}

export const initialState: NotificationsState = {
	notifications: [],
};
