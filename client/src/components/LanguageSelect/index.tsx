import React from 'react';
import { Languages } from 'config/i18n.config';
import { Flag, FlagNameValues, Dropdown } from 'semantic-ui-react';
import i18next from 'i18next';
import { setLng } from 'helpers/setLng.helper';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';

const LanguageSelect: React.FC = () => {
	const lngInStore = localStorage.getItem(LocalStorageKeys.SESSION_LNG);
	const defaultValue = lngInStore ? { defaultValue: lngInStore } : {};

	const selectLanguage = (value: string) => {
		const lng = value ? value : undefined;
		const countryInfo = navigator.language;
		const countryInfoParts = countryInfo.split('-');
		const countryCode = countryInfoParts[1].toLowerCase();

		setLng(lng ?? countryCode);
		i18next.changeLanguage(lng ?? countryCode);
	};

	return (
		<Dropdown
			placeholder="Language"
			style={{ marginRight: 20, width: 100 }}
			onChange={(event, data) => selectLanguage(data.value as string)}
			selection
			clearable
			{...defaultValue}
			options={Object.entries(Languages).map((lang) => {
				const [code, country] = lang;
				const flagName = code === 'en' ? 'uk' : code;

				return {
					key: code,
					value: code,
					text: (
						<>
							<Flag name={flagName as FlagNameValues} /> {country}
						</>
					),
				};
			})}
		/>
	);
};

export default LanguageSelect;
