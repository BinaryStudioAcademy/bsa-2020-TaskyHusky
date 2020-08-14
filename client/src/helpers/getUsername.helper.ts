export const getUsername = (user: WebApi.Entities.UserProfile) =>
	user.firstName + (user.lastName ? ' ' + user.lastName : '');
