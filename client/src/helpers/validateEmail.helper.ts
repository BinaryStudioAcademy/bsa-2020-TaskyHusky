/* eslint-disable  no-useless-escape */
export type validateEmailType = (input: string) => boolean;

export const validateEmail: validateEmailType = (email) => {
	const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return emailRegExp.test(email);
};
