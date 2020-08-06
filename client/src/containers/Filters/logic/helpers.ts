export const getFullUserName = (user: WebApi.Entities.User | undefined): string => {
	if (!user) {
		return '';
	}
	const { firstName = '', lastName = '' } = user;
	return `${firstName} ${lastName}`;
};
