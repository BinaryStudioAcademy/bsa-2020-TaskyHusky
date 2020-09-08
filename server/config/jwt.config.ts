export const jwtSecret = process.env.JWT_SECRET || 'secret123';

export const routesWhiteList = [
	'/api/auth/login',
	'/api/auth/register',
	'/api/auth/google',
	'/api/auth/forgot-password',
	'/api/auth/reset-password/*',
	'/api/auth/check_email',
];
