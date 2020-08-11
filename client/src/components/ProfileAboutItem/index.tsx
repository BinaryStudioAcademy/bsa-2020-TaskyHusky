import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	text: keyof UserProfileState;
	placeholder: string;
	icon: string;
}
const ProfileAboutItem: React.FC<Props> = (props: Props) => {
	const { text = '', placeholder, icon } = props;
	return (
		<div className={styles.container}>
			<Icon disabled name={icon as any} size="large" />
			{text ? <p className={styles.textData}>{text}</p> : <p className={styles.textData}>{placeholder}</p>}
		</div>
	);
};

export default ProfileAboutItem;
