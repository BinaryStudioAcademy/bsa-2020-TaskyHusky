import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';

interface Props {
	name: string;
	category?: string;
	avatar?: string;
	issues?: Partial<WebApi.Entities.Issue>[];
}

const ProjectCard: React.FC<Props> = (props: Props) => {
	const { name, category = '', issues = [], avatar } = props;
	const { t } = useTranslation();
	const id = useSelector((state: RootState) => state.auth.user?.id);
	const myIssues = issues.filter((item) => item.assigned?.id === id);
	const doneIssues = myIssues.filter((item) => item.status && item.status.title === 'Done').length;
	const undoneIssues = myIssues.length - doneIssues;
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.avatar}>
					{avatar ? (
						<img src={avatar} className={styles.img} alt="avatar" />
					) : (
						<p className={styles.avatarTitle}>{name[0]}</p>
					)}
				</div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{name}</p>
					{category && <p className={styles.category}>{category} project</p>}
				</div>
			</div>
			<div className={styles.issues}>
				<p className={styles.text}>
					{t('my_open_issues')} <span className={styles.count}>{undoneIssues}</span>
				</p>
				<p className={styles.text}>
					{t('my_done_issues')} <span className={styles.count}>{doneIssues}</span>
				</p>
			</div>
		</div>
	);
};

export default ProjectCard;
