import React from 'react';
import { Languages } from 'config/i18n.config';
import { Flag, FlagNameValues, Dropdown } from 'semantic-ui-react';
import i18next from 'i18next';
import { setLng } from 'helpers/setLng.helper';
import { getLanguage } from 'helpers/getLanguage.helper';
import styles from './styles.module.scss';

const LanguageSelect: React.FC = () => {
	const language = getLanguage();

	const selectLanguage = (value: string) => {
		const lng = value ? value : undefined;
		const defaultLng = getLanguage();

		setLng(lng ?? defaultLng);
		i18next.changeLanguage(lng ?? defaultLng);
	};

	return (
		<Dropdown
			placeholder="Language"
			className={styles.select}
			onChange={(event, data) => selectLanguage(data.value as string)}
			selection
			defaultValue={language}
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
