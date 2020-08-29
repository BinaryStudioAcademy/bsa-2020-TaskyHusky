export const getEnv = () => {
	return process.env.NODE_ENV ?? 'dev';
};

export const isDev = () => {
	return /^dev(elopment)?$/.test(getEnv());
};

export const isProd = () => {
	return /^prod(uction)?$/.test(getEnv());
};

export const isTest = () => {
	return /^test$/.test(getEnv());
};
