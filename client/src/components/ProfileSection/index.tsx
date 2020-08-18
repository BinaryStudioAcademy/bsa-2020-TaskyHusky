import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import ProfileActivityBlock from 'components/ProfileActivityBlock';
import projectIcon from 'icons/profile/projectIcon.svg';

interface Props {
	isCurrentUser: boolean;
	mockData: any;
	projects: Array<any>;
}

const ProfileSection: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { isCurrentUser, mockData, projects } = props;
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
			<h3 className={styles.header}>{t('worked_on')}</h3>
			{isCurrentUser && <p className={styles.headerSecondary}>{t('content_privat_message')}</p>}
			<ProfileActivityBlock
				mockData={mockData.activity}
				countItem={countActivity}
				icon={projectIcon}
				emptyContent={emptyActivityCard}
			/>
			{mockData.activity.length && (
				<>
					<h3 className={styles.header}>{t('work_places')}</h3>
					<ProfileActivityBlock mockData={projects} countItem={countProject} />
				</>
			)}
			<h3 className={styles.header}>{t('work_with')}</h3>
			<ProfileActivityBlock
				mockData={mockData.colleagues}
				countItem={countColleagues}
				emptyContent={emptyColleaguesCard}
			/>
		</section>
	);
};

export default ProfileSection;
