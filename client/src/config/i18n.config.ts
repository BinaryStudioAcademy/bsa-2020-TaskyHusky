import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from 'translations/en';
import { ru } from 'translations/ru';
import { ua } from 'translations/ua';
import { getLanguage } from 'helpers/getLanguage.helper';

export default function configureLanguages() {
	const lng = getLanguage();

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
		lng,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
}

export const Languages = {
	en: 'English',
	ru: 'Русский',
	ua: 'Українська',
};
