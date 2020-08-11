import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styles from 'components/ProfileAside/styles.module.scss';
import { PropsUserData } from 'containers/ProfilePage';
import ProfileAboutItem from 'components/ProfileAboutItem';

const ProfileAboutBlock: React.FC<PropsUserData> = (props: PropsUserData) => {
	const { user, isCurrentUser } = props;
	return (
		<Container className={styles.infoBlock}>
			<Header as="h3" className={styles.infoBlock__header}>
				About
			</Header>
			{(user.jobTitle || isCurrentUser) && (
				<ProfileAboutItem
					data={{
						text: user.jobTitle || '',
						placeholder: 'Your job title',
						icon: 'briefcase',
					}}
				/>
			)}
			{(user.department || isCurrentUser) && (
				<ProfileAboutItem
					data={{
						text: user.department || '',
						placeholder: 'Your department',
						icon: 'code branch',
					}}
				/>
			)}
			{(user.organization || isCurrentUser) && (
				<ProfileAboutItem
					data={{
						text: user.organization || '',
						placeholder: 'Your organization',
						icon: 'fax',
					}}
				/>
			)}
			{(user.location || isCurrentUser) && (
				<ProfileAboutItem
					data={{
						text: user.location || '',
						placeholder: 'Your location',
						icon: 'map marker alternate',
					}}
				/>
			)}
		</Container>
	);
};

export default ProfileAboutBlock;
