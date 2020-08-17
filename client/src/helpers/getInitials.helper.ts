import { User } from 'containers/LoginPage/logic/state';

export const getInitials = (user: User) => {
	return (user.firstName as string)[0] + (user.lastName ? user.lastName[0] : '');
};
