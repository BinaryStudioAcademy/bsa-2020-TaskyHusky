import { WebApiException } from 'typings/webApiException';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';
import { LoginRedirectWhiteList } from 'constants/LoginRedirectWhiteList';

export const handleSagaError = (error: Error | WebApiException) => {
	if (error instanceof Error) {
		throw error;
	}

	const shouldRedirect = !LoginRedirectWhiteList.some((regex) => regex.test(window.location.pathname));

	if (error.status === 401 && shouldRedirect) {
		localStorage.removeItem(LocalStorageKeys.SESSION_TOKEN);
		window.location.replace('/login');
	} else {
		throw error;
	}
};
