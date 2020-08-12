import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Header, Segment, Button } from 'semantic-ui-react';
import UserActivityItem from 'components/UserActivityItem';

interface Props {
	isCurrentUser: boolean;
	mockData: any;
}

const ProfileSection: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { isCurrentUser, mockData } = props;
	return (
		<section className={styles.mainInfo}>
			<Header as="h3">{t('worked_on')}</Header>
			{isCurrentUser && <p>{t('content_privat_message')}</p>}
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
							<Header as="h3">{t('no_work')}</Header>
							<p>{t('content_no_work')}</p>
						</div>
					</div>
				)}
			</Segment>
			<Header as="h3">{t('work_with')}</Header>
			<Segment className={styles.card}>
				<div className={styles.emptyCard}>
					<img
						className={styles.emptyCard__image}
						src="https://jira-frontend-static.prod.public.atl-paas.net/assets/Oliver.7c2bb66f3ace7dd9e154be41d6eb0526.8.svg"
						alt="user do not have a work experience with other people"
					/>
					<div className={styles.emptyCard__content}>
						<Header as="h3">{t('no_people')}</Header>
						<p>{t('content_no_people')}</p>
					</div>
				</div>
			</Segment>
			{isCurrentUser && (
				<>
					<p>{t('tell_experience')}</p>
					<Button>{t('send_feedback')}</Button>
				</>
			)}
		</section>
	);
};

export default ProfileSection;
