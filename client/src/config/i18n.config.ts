import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from 'translations/en';
import { ru } from 'translations/ru';
import { ua } from 'translations/ua';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';

export default function configureLanguages() {
	const countryInfo = navigator.language;
	const countryInfoParts = countryInfo.replace(/[^\w{2}].*/, '');
	const countryCode = countryInfoParts.toLowerCase();
	const lngInStore = localStorage.getItem(LocalStorageKeys.SESSION_LNG);

	i18n.use(initReactI18next).init({
		resources: {
			en: {
				translation: en,
			},
			ru: {
				translation: ru,
			},
			ua: {
				translation: ua,
			},
		},
		lng: lngInStore ?? countryCode,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
}

export const Languages = {
	en: 'English',
	ru: 'Russian',
	ua: 'Ukrainian',
};
