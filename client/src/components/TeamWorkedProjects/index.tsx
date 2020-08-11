import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import worksImg from 'assets/images/team-page-works.jpg';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';

const TeamWorkedProjects = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className={[styles.worked_block_wrapper, styles.flex_row].join(' ')}>
				<Header as="h3">{t('worked_on')}</Header>
				<Image src={worksImg} size="small" />
				<div className={styles.worked_block}>
					<Header as="h4">{t('no_works')}</Header>
					<p>There is no projects you have started</p>
				</div>
			</div>
		</>
	);
};

export default TeamWorkedProjects;
