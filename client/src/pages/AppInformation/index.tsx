import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import logo from 'assets/logo192.png';
import projects from 'assets/images/appInformation/projects.png';
import scram from 'assets/images/appInformation/scram.png';
import kanban from 'assets/images/appInformation/kanban.png';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface Props {}

const AppInformation = (props: Props) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={`${styles.segmentWrapper} site-header site-header-wrapper`}>
				<Menu secondary className={styles.menuWrapper}>
					<Menu.Item className={`${styles.logoItem} site-logo`}>
						<Image src={logo} alt={t('taskyhusky_logo')} className={styles.logoImage} />
						<span className={`${styles.logoText} site-logo-text`}>TaskyHusky</span>
					</Menu.Item>
					<Link to={'/login'} className={['primaryBtn', styles.link_login].join(' ')}>
						<Icon name="sign-in" />
						{t('log_in')}
					</Link>
				</Menu>
			</div>
			<div className={styles.main__container}>
				<main className={styles.main__content}>
					<section>
						<div
							className={[
								styles.content__block_wrapper,
								styles.content__block,
								styles.content__block_title,
							].join(' ')}
						>
							<h1 className={styles.content__title}>{t('landing_title')}</h1>
							<div className={styles.content__image_wrapper}>
								<img src={projects} className={styles.content__image} alt="projects" />
							</div>
						</div>
						<div className={styles.content__block_wrapper}>
							<div className={styles.content__intro}>
								<h2 className={styles.content__intro_title}> {t('landing_intro_title')}</h2>
								<p className={styles.content__intro_description}>{t('landing_intro_description')}</p>
							</div>
						</div>
						<div className={[styles.content__block_wrapper, styles.content__block].join(' ')}>
							<div className={styles.content__image_wrapper}>
								<img src={kanban} className={styles.content__image} alt="kanban" />
							</div>
							<div className={styles.content__block_description}>
								<div className={styles.description}>
									<h3 className={styles.description__title}>{t('landing_intro_description')}</h3>
									<p className={styles.description__content}>
										{t('landing_block_description_planning')}
									</p>
								</div>
								<div className={styles.description}>
									<h3 className={styles.description__title}>
										{t('landing_block_title_estimations')}
									</h3>
									<p className={styles.description__content}>
										{t('landing_block_description_estimations')}.
									</p>
								</div>
							</div>
						</div>
						<div className={[styles.content__block_wrapper, styles.content__block].join(' ')}>
							<div className={styles.content__block_description}>
								<div className={styles.description}>
									<h3 className={styles.description__title}>
										{t('landing_block_title_prioritization')}
									</h3>
									<p className={styles.description__content}>
										{t('landing_block_description_prioritization')}
									</p>
								</div>
								<div>
									<h3 className={styles.description__title}>{t('landing_block_title_execution')}</h3>
									<p className={styles.description__content}>
										{t('landing_block_description_execution')}
									</p>
								</div>
							</div>
							<div className={styles.content__image_wrapper}>
								<img src={scram} className={styles.content__image} alt="scram" />
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default AppInformation;
