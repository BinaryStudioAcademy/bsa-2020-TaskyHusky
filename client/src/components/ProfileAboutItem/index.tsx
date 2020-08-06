import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import ContentInput from 'components/ContentInput';

const ProfileAboutItem = ({
	data: { text, isCurrentUser, name },
}: {
	data: { text: string; name: string; isCurrentUser: boolean };
}) => {
	return (
		<div className={styles.container}>
			<Icon disabled name="briefcase" size="large" />
			{text ? (
				<ContentInput
					isCurrentUser={isCurrentUser}
					contentData={{ text, defaultContent: false, name }}
				></ContentInput>
			) : (
				<ContentInput
					isCurrentUser={isCurrentUser}
					contentData={{ text: 'Your job title', defaultContent: true, name }}
				/>
			)}
		</div>
	);
};

export default ProfileAboutItem;
