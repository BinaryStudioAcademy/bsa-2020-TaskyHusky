import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styles from 'components/ProfileAside/styles.module.scss';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import ProfileAboutItem from 'components/ProfileAboutItem';

interface Props {
	isCurrentUser: boolean;
	mockData?: any;
	jobTitle: keyof UserProfileState;
	organization: keyof UserProfileState;
	department: keyof UserProfileState;
	location: keyof UserProfileState;
}

const ProfileAboutBlock: React.FC<Props> = (props: Props) => {
	const { jobTitle, organization, department, location, isCurrentUser } = props;
	return (
		<Container className={styles.infoBlock}>
			<Header as="h3" className={styles.infoBlock__header}>
				About
			</Header>
			{(jobTitle || isCurrentUser) && (
				<ProfileAboutItem text={jobTitle} placeholder="Your job title" icon="briefcase" />
			)}
			{(department || isCurrentUser) && (
				<ProfileAboutItem text={department} placeholder="Your department" icon="code branch" />
			)}
			{(organization || isCurrentUser) && (
				<ProfileAboutItem text={organization} placeholder="Your organization" icon="fax" />
			)}
			{(location || isCurrentUser) && (
				<ProfileAboutItem text={location} placeholder="Your location" icon="map marker alternate" />
			)}
		</Container>
	);
};

export default ProfileAboutBlock;
