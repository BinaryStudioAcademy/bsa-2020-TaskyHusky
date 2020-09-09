import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { defaultAvatarBg } from 'constants/defaultColors';

interface Props {
	item: {
		id: string;
		name: string;
		category?: string;
		icon?: string;
		issues?: Partial<WebApi.Entities.Issue>[];
		color?: string;
	};
	additionalBlock?: boolean;
}

const ProjectCard: React.FC<Props> = (props: Props) => {
	const {
		item: { name, category = '', issues = [], icon, id, color },
		additionalBlock = false,
	} = props;
	const { t } = useTranslation();
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const myIssues = issues.filter((issue) => issue.assigned?.id === userId);
	const doneIssues = myIssues.filter((issue) => issue.status && issue.status.title === 'Done').length;
	const undoneIssues = myIssues.length - doneIssues;
	return (
		<div className={styles.card} style={additionalBlock ? { height: 0, overflow: 'hidden' } : {}}>
			<Link to={`project/${id}/issues`} className={styles.linkContainer}>
				<div className={styles.header}>
					<div className={styles.avatar} style={{ backgroundColor: color ?? defaultAvatarBg }}>
						{icon ? (
							<img src={icon} className={styles.img} alt="avatar" />
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
				<div className={styles.colorBlock} style={{ background: color ?? '#fece2f' }} />
			</Link>
		</div>
	);
};

export default ProjectCard;
