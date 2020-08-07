import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export default async function configureLanguages() {
	const countryCodeRes = await fetch('http://api.hostip.info', { method: 'POST' });
	const text = await countryCodeRes.text();
	const parser = new DOMParser();
	const xml = parser.parseFromString(text, 'text/xml');
	const element = xml.getElementsByTagName('countryAbbrev')[0] as HTMLDivElement;
	const countryCode = element.innerHTML.toLowerCase();

	i18n.use(initReactI18next).init({
		resources: {
			en: {
				translation: {
					loginHeader: 'Sign in to TaskyHusky',
				},
			},
			ru: {
				translation: {
					loginHeader: 'Вход в аккаунт TaskyHusky',
				},
			},
			ua: {
				translation: {
					loginHeader: 'Вхід до аккаунту TaskyHusky',
				},
			},
		},
		lng: countryCode,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
}
