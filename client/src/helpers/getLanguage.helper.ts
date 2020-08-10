import { LocalStorageKeys } from 'constants/LocalStorageKeys';

export const getLanguage = () => {
	const countryInfo = navigator.language;
	const countryInfoParts = countryInfo.split('-');
	const countryCode = countryInfoParts[countryInfoParts.length - 1].toLowerCase();
	const lngInStore = localStorage.getItem(LocalStorageKeys.SESSION_LNG);

	return lngInStore || countryCode;
};
