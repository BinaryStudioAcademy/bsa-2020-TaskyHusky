export const getFullUserName = (firstName: string | undefined, lastName: string | undefined): string => {
	return `${firstName || 'Unknown'} ${lastName || 'Unknown'}`;
};
