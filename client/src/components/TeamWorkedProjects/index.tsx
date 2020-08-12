import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import worksImg from 'assets/images/team-page-works.svg';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';

const TeamWorkedProjects = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.worked_block_wrapper}>
				<Header as="h3">{t('worked_on')}</Header>
				<div className={styles.flex_row}>
					<Image src={worksImg} size="small" />
					<div className={styles.worked_block}>
						<Header as="h4">{t('no_works')}</Header>
						<p className={styles.p_descr}>
							There are no projects which have been started yet. When it&apos;ll happen you can get quick
							access to one you need
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamWorkedProjects;
