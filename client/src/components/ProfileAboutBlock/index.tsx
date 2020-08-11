import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styles from 'components/ProfileAside/styles.module.scss';
import { PropsUserData } from 'containers/ProfilePage';
import ProfileAboutItem from 'components/ProfileAboutItem';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

const ProfileAboutBlock: React.FC<PropsUserData> = (props: PropsUserData) => {
	const { user, isCurrentUser } = props;
	const { jobTitle = '', department = '', organization = '', location = '' } = user;
	return (
		<Container className={styles.infoBlock}>
			<Header as="h3" className={styles.infoBlock__header}>
				About
			</Header>
			{(jobTitle || isCurrentUser) && (
				<ProfileAboutItem
					text={jobTitle as keyof UserProfileState}
					placeholder="Your job title"
					icon="briefcase"
				/>
			)}
			{(department || isCurrentUser) && (
				<ProfileAboutItem
					text={department as keyof UserProfileState}
					placeholder="Your department"
					icon="code branch"
				/>
			)}
			{(organization || isCurrentUser) && (
				<ProfileAboutItem
					text={organization as keyof UserProfileState}
					placeholder="Your organization"
					icon="fax"
				/>
			)}
			{(location || isCurrentUser) && (
				<ProfileAboutItem
					text={location as keyof UserProfileState}
					placeholder="Your location"
					icon="map marker alternate"
				/>
			)}
		</Container>
	);
};

export default ProfileAboutBlock;
