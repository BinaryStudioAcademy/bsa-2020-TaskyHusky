import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import ContentInput from 'components/ContentInput';

interface Props {
	data: {
		text: string;
		name: string;
		isCurrentUser: boolean;
		placeholder: string;
	};
}
const ProfileAboutItem: React.FC<Props> = (props: Props) => {
	const {
		data: { text, isCurrentUser, name, placeholder },
	} = props;
	return (
		<div className={styles.container}>
			<Icon disabled name="briefcase" size="large" />
			<ContentInput isCurrentUser={isCurrentUser} contentData={{ text, placeholder, name }}></ContentInput>
		</div>
	);
};

export default ProfileAboutItem;
