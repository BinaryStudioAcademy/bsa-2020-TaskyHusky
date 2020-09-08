import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import ProfileActivityBlock from 'components/ProfileActivityBlock';
import UserActivityItem from 'components/UserActivityItem';
import IssueActivityItem from 'components/IssueActivityItem';

interface Props {
	activity: any;
	projects: Array<WebApi.Entities.Projects>;
	teammates: Array<WebApi.Entities.UserProfile>;
}

const ProfileSection: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { activity, projects, teammates } = props;
	const countActivity = 3;
	const countProject = 2;
	const countColleagues = 1;
	const emptyActivityCard = {
		img:
			'https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg',
		title: 'no_work',
		content: 'content_no_work',
	};
	const emptyColleaguesCard = {
		img:
			'https://jira-frontend-static.prod.public.atl-paas.net/assets/Oliver.7c2bb66f3ace7dd9e154be41d6eb0526.8.svg',
		title: 'no_people',
		content: 'content_no_people',
	};

	return (
		<section className={styles.mainInfo}>
			{(Boolean(activity.length) || !projects.length) && (
				<h3 className={`${styles.header} ${styles.firstHeader}`}>{t('worked_on')}</h3>
			)}
			<ProfileActivityBlock
				data={activity}
				countItem={countActivity}
				emptyContent={emptyActivityCard}
				showEmpty={!projects.length}
				component={IssueActivityItem}
			/>
			{Boolean(projects.length) && (
				<>
					<h3 className={styles.header}>{t('work_places')}</h3>
					<ProfileActivityBlock
						data={projects}
						countItem={countProject}
						showEmpty={false}
						component={UserActivityItem}
					/>
				</>
			)}
			<h3 className={styles.header}>{t('work_with')}</h3>
			<ProfileActivityBlock
				data={teammates}
				countItem={countColleagues}
				emptyContent={emptyColleaguesCard}
				component={UserActivityItem}
				showEmpty={true}
			/>
		</section>
	);
};

export default ProfileSection;
