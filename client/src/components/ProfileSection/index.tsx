import React from 'react';
import styles from './styles.module.scss';
import { Header, Segment, Button } from 'semantic-ui-react';
import UserActivityItem from 'components/UserActivityItem';
import { propsUserData } from 'containers/ProfilePage';

const ProfileSection = ({ data: { isCurrentUser, mockData } }: propsUserData) => {
	return (
		<section className={styles.mainInfo}>
			<Header as="h3">Worked on</Header>
			{isCurrentUser && <p>Others will only see what they can access</p>}
			<Segment className={styles.card}>
				{mockData.activity.length ? (
					<div className={styles.recentActivity}>
						{mockData.activity.map((item: any) => (
							<UserActivityItem item={item} key={item.id} />
						))}
					</div>
				) : (
					<div className={styles.emptyCard}>
						<img
							className={styles.emptyCard__image}
							src="https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg"
							alt="user do not have a work experience"
						/>
						<div className={styles.emptyCard__content}>
							<Header as="h3">There is no work to see here</Header>
							<p>Things you created, edited or commented on in the last 90 days.</p>
						</div>
					</div>
				)}
			</Segment>
			<Header as="h3">You work with</Header>
			<Segment className={styles.card}>
				<div className={styles.emptyCard}>
					<img
						className={styles.emptyCard__image}
						src="https://jira-frontend-static.prod.public.atl-paas.net/assets/Oliver.7c2bb66f3ace7dd9e154be41d6eb0526.8.svg"
						alt="user do not have a work experience with other people"
					/>
					<div className={styles.emptyCard__content}>
						<Header as="h3">There are no people to see here</Header>
						<p>People you collaborated with in the last 90 days will show here.</p>
					</div>
				</div>
			</Segment>
			{isCurrentUser && (
				<>
					<p>Tell us about your experience with profiles and search within this directory.</p>
					<Button>Send Tasky-Husky feedback</Button>
				</>
			)}
		</section>
	);
};

export default ProfileSection;
