export const LOAD_NOTIFICATIONS = 'USER:NOTIFICATIONS:LOAD';
export const VIEW_NOTIFICATION = 'USER:NOTIFICATION:VIEW';
export const SET_NOTIFICATIONS = 'USER:NOTIFICATIONS:SET';

export type ViewNotification = {
	id: string;
};

export type SetNotifications = {
	notifications: WebApi.Entities.Notification[];
};
