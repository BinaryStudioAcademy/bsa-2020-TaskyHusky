import { User } from 'containers/LoginPage/logic/state';

export const getInitials = (user: User | WebApi.Entities.UserProfile) => {
	return (user.firstName ? user.firstName[0] : 'A') + (user.lastName ? user.lastName[0] : '');
};
