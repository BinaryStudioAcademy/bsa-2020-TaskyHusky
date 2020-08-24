export const LOAD_NOTIFICATIONS = 'USER:NOTIFICATIONS:LOAD';
export const SET_NOTIFICATIONS = 'USER:NOTIFICATIONS:SET';

export type LoadNotifications = {
	userId: string;
};

export type SetNotifications = {
	notifications: WebApi.Entities.Notification[];
};
