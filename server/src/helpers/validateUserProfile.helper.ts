import { validate } from 'class-validator';
import { IVerifyOptions } from 'passport-local';
import { UserProfile } from '../entity/UserProfile';
import { ErrorResponse } from './errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { authErrorMessages, EMAIL, PASSWORD } from '../constants/auth.constants';

interface ValidateUserProfile {
	(data: Partial<UserProfile>, next: (error: any, user?: any, options?: IVerifyOptions | undefined) => void): Promise<
		boolean
	>;
}

// eslint-disable-next-line consistent-return
export const validateUserProfile: ValidateUserProfile = async (data, next) => {
	const userInstance = new UserProfile(data);
	const errorsArray = await validate(userInstance);
	const errors = errorsArray.length > 0;

	if (errors) {
		errorsArray.forEach((error) => {
			switch (error.property) {
				case EMAIL:
					return next(
						new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_EMAIL),
						null,
					);

				case PASSWORD:
					return next(
						new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_PASSWORD),
						null,
					);
				default:
					return next(
						new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.UPROCESSABLE_DATA),
						null,
					);
			}
		});
	}

	return !errors;
};
