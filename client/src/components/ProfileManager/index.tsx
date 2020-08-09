import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import styles from './styles.module.scss';
import { Header, Segment } from 'semantic-ui-react';
import ContentInput from 'components/ContentInput';

const ProfileManager = () => {
	const user = useSelector((state: RootState) => state.user);

	return (
		<section className={styles.container}>
			<Header as="h3">About you</Header>
			<Segment className={styles.card}>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.firstName,
						name: 'firstname',
						placeholder: 'Your firstname',
						title: 'First name',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.lastName,
						name: 'lastname',
						placeholder: 'Your lastname',
						title: 'Last name',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.username,
						name: 'username',
						placeholder: 'Your username',
						title: 'Public name',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.jobTitle,
						name: 'jobtitle',
						placeholder: 'Your jobtitle',
						title: 'Job title',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.department,
						name: 'department',
						placeholder: 'Your department',
						title: 'Department',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.organization,
						name: 'organization',
						placeholder: 'Your organization',
						title: 'Organization',
					}}
				/>
				<ContentInput
					isCurrentUser={true}
					contentData={{
						text: user.location,
						name: 'location',
						placeholder: 'Your location',
						title: 'Based in',
					}}
				/>
			</Segment>
		</section>
	);
};

export default ProfileManager;
