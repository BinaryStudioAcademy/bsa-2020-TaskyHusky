import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from 'translations/en';
import { ru } from 'translations/ru';
import { ua } from 'translations/ua';

export default async function configureLanguages() {
	const countryCodeRes = await fetch('http://api.hostip.info');
	const text = await countryCodeRes.text();
	const parser = new DOMParser();
	const xml = parser.parseFromString(text, 'text/xml');
	const element = xml.getElementsByTagName('countryAbbrev')[0] as HTMLDivElement;
	const countryCode = element.innerHTML.toLowerCase();

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
