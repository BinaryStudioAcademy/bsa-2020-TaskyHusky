import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from 'translations/en';
import { ru } from 'translations/ru';
import { ua } from 'translations/ua';

export default function configureLanguages() {
	const countryInfo = navigator.language;
	const countryInfoParts = countryInfo.split('-');
	const countryCode = countryInfoParts[1].toLowerCase();

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
		lng: countryCode,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
}
