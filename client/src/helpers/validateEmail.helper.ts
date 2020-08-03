/* eslint-disable  no-useless-escape */
export type ValidateEmailType = (input: string) => boolean;

export const validateEmail: ValidateEmailType = (email) => {
	const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return emailRegExp.test(email);
};
