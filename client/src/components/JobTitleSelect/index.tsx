import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	text: string;
	propKey: keyof UserProfileState;
	placeholder: string;
	title: string;
	handleSelect: (propKey: keyof UserProfileState, value: string) => void;
}

const options = [
	{ key: 'dbAdmin', text: 'Database administrator', value: 'Database administrator' },
	{ key: 'backEndDev', text: 'Back-end developer', value: 'Back-end developer' },
	{ key: 'frontEndDev', text: 'Front-end developer', value: 'Front-end developer' },
	{ key: 'fullStackDev', text: 'Full-Stack developer', value: 'Full-Stack developer' },
];

const JobTitleSelect: React.FC<Props> = (props: Props) => {
	const { text, propKey, placeholder, title, handleSelect } = props;
	return (
		<div>
			<label className={styles.label}>{title}</label>
			<Dropdown
				className={styles.inputView}
				name={propKey}
				value={text}
				placeholder={placeholder}
				onChange={(event, data) => handleSelect(propKey, data.value as string)}
				fluid
				selection
				options={options}
			/>
		</div>
	);
};

export default JobTitleSelect;
