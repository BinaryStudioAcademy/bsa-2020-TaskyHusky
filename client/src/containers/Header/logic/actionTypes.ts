export const START_LOADING = 'HEADER:START_LOADING';
export const SUCCESS_LOADING = 'HEADER:SUCCESS_LOADING';

export const CHANGE_INVITE_STATUS = 'HEADER:CHANGE_INVITE_STATUS';

export type successLoading = {
	invites: Partial<WebApi.Entities.UserProfile>[];
};

export type startLoading = {
	id: string;
};

export type changeInviteStatus = {
	userId: string;
	teammateId: string;
	status: 'accept' | 'decline';
};
