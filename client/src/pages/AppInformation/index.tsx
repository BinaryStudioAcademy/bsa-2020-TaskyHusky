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
						Login
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
							<h1 className={styles.content__title}>Лучший инструмент разработки для agile-команд</h1>
							<div className={styles.content__image_wrapper}>
								<img src={projects} className={styles.content__image} alt="projects" />
							</div>
						</div>
						<div className={styles.content__block_wrapper}>
							<div className={styles.content__intro}>
								<h2 className={styles.content__intro_title}>
									Лучшие команды разработчиков выпускают ПО быстро и часто.
								</h2>
								<p className={styles.content__intro_description}>
									Решение TaskyHusky разработано таким образом, чтобы каждый член вашей команды
									разработчиков мог планировать, отслеживать и выпускать превосходное ПО.
								</p>
							</div>
						</div>
						<div className={[styles.content__block_wrapper, styles.content__block].join(' ')}>
							<div className={styles.content__image_wrapper}>
								<img src={kanban} className={styles.content__image} alt="kanban" />
							</div>
							<div className={styles.content__block_description}>
								<div className={styles.description}>
									<h3 className={styles.description__title}>Гибкое планирование</h3>
									<p className={styles.description__content}>
										Scrum? Есть. Kanban? Есть. TaskyHusky предоставляет множество вариантов
										планирования, благодаря чему ваша команда сможет создавать планы оптимальным
										способом.
									</p>
								</div>
								<div className={styles.description}>
									<h3 className={styles.description__title}>Точные оценки</h3>
									<p className={styles.description__content}>
										Благодаря оценкам ваша команда будет работать качественнее и эффективнее. Вы
										можете использовать очки за истории, часы, размеры футболок или собственные
										методики оценки — TaskyHusky все это поддерживает.
									</p>
								</div>
							</div>
						</div>
						<div className={[styles.content__block_wrapper, styles.content__block].join(' ')}>
							<div className={styles.content__block_description}>
								<div className={styles.description}>
									<h3 className={styles.description__title}>
										Расстановка приоритетов на основе ценности
									</h3>
									<p className={styles.description__content}>
										Упорядочить пользовательские истории, задачи и баги в бэклоге продукта можно
										обычным перетаскиванием. Теперь все самое важное для клиента всегда будет
										наверху.
									</p>
								</div>
								<div>
									<h3 className={styles.description__title}>Прозрачность исполнения</h3>
									<p className={styles.description__content}>
										С Jira Software работа вашей команды станет прозрачнее и все ее члены всегда
										будут в курсе происходящего, где бы они ни находились — в соседних комнатах или
										на разных континентах.
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
