import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import ProfileActivityBlock from 'components/ProfileActivityBlock';
import UserActivityItem from 'components/UserActivityItem';

type Props = {
	projects?: WebApi.Entities.Projects[];
};

const TeamWorkedProjects: React.FC<Props> = ({ projects }: Props) => {
	const { t } = useTranslation();
	const countProject = 1;
	return (
		<>
			{projects?.length && (
				<>
					<h3 className={styles.mainHeader}>{t('projects')}</h3>
					<ProfileActivityBlock
						data={projects}
						countItem={countProject}
						showEmpty={false}
						component={UserActivityItem}
					/>
				</>
			)}
		</>
	);
};

export default TeamWorkedProjects;
