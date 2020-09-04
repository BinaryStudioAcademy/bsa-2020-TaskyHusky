import React from 'react';
import WorkIssueCard from 'components/WorkIssueCard';
import styles from './styles.module.scss';
import { Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	assignedIssues: Array<{
		issueKey: string;
		id: string;
		priority: WebApi.Entities.Priority;
		summary: string;
		type: WebApi.Entities.IssueType;
	}>;
}

const WorkAssignedBlock: React.FC<Props> = (props: Props) => {
	const { assignedIssues } = props;
	const { t } = useTranslation();
	return (
		<div className="workBlock">
			<div className={styles.header}>
				<Popup content={t('type')} trigger={<p className={styles.headerIcon}>T</p>} />
				<Popup content={t('priority')} trigger={<p className={styles.headerIcon}>{t('p')}</p>} />
				<p className={styles.headerKey}>{t('key')}</p>
				<p className={styles.headerSummary}>{t('summary')}</p>
			</div>
			{assignedIssues.map((item) => (
				<WorkIssueCard
					key={item.id}
					issueKey={item.issueKey}
					description={item.summary}
					priority={item.priority}
					type={item.type}
				/>
			))}
		</div>
	);
};

export default WorkAssignedBlock;
