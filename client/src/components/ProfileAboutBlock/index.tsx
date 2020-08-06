import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styles from 'components/ProfileAside/styles.module.scss';
import { propsUserData } from 'containers/ProfilePage';
import ProfileAboutItem from 'components/ProfileAboutItem';

const ProfileAboutBlock = ({ data: { user, isCurrentUser } }: propsUserData) => {
	return (
		<Container className={styles.infoBlock}>
			<Header as="h3" className={styles.infoBlock__header}>
				About
			</Header>
			{(user.jobTitle || isCurrentUser) && (
				<ProfileAboutItem
					data={{ text: user.jobTitle ? user.jobTitle : '', name: 'jobTitle', isCurrentUser }}
				/>
			)}
			{(user.department || isCurrentUser) && (
				<ProfileAboutItem
					data={{ text: user.department ? user.department : '', name: 'department', isCurrentUser }}
				/>
			)}
			{(user.organization || isCurrentUser) && (
				<ProfileAboutItem
					data={{ text: user.organization ? user.organization : '', name: 'organization', isCurrentUser }}
				/>
			)}
			{(user.location || isCurrentUser) && (
				<ProfileAboutItem
					data={{ text: user.location ? user.location : '', name: 'location', isCurrentUser }}
				/>
			)}
		</Container>
	);
};

export default ProfileAboutBlock;
