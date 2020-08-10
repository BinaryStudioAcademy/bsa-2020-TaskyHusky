export const getFullUserName = (user: WebApi.Entities.UserProfile | undefined): string => {
	if (!user) {
		return '';
	}
	const { firstName = '', lastName = '' } = user;
	return `${firstName} ${lastName}`;
};
