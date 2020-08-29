import { isProd } from '../src/helpers/nodeEnv';

export const appPort = process.env.APP_PORT || 5000;
export const frontendURL = isProd() ? process.env.PROD_FRONTEND_URL : process.env.DEV_OR_TEST_FRONTEND_URL;
