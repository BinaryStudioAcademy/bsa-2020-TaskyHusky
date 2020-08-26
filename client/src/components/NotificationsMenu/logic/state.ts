export interface NotificationsState {
	notifications: WebApi.Entities.Notification[];
}

export const initialState: NotificationsState = {
	notifications: [],
};
