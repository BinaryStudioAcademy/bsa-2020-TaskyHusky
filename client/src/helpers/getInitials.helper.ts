import { User } from 'containers/LoginPage/logic/state';

export const getInitials = (user: User | WebApi.Entities.UserProfile) => {
	return (user.firstName as string)[0] + (user.lastName ? user.lastName[0] : '');
};
