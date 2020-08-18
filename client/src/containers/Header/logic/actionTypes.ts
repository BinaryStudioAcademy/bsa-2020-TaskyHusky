export const START_LOADING = 'HEADER:START_LOADING';
export const SUCCESS_LOADING = 'HEADER:SUCCESS_LOADING';

export type successLoading = {
	invites: Partial<WebApi.Entities.UserProfile>[];
};

export type startLoading = {
	id: string;
};
