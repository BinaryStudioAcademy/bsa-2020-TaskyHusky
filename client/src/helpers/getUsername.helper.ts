import i18next from 'i18next';

export const getUsername = (user: WebApi.Entities.UserProfile) =>
	(user.firstName ?? i18next.t('anonymous')) + (user.lastName ? ' ' + user.lastName : '');
