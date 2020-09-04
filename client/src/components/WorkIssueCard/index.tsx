import React from 'react';
import styles from './styles.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
	issueKey: string;
	description: string;
	priority: WebApi.Entities.Priority;
	type: WebApi.Entities.IssueType;
}

const WorkIssueCard: React.FC<Props> = (props: Props) => {
	const { issueKey, description, type, priority } = props;
	const { t } = useTranslation();
	return (
		<div className={styles.issue}>
			<Popup
				content={`${t('type')}: ${type.title}`}
				trigger={
					<Icon
						name={type.icon as any}
						color={type.color as any}
						className={styles.icon}
						title={type.title}
					/>
				}
			/>
			<Popup
				content={`${t('priority')}: ${type.title}`}
				trigger={
					<Icon
						name={priority.icon as any}
						color={priority.color as any}
						className={styles.icon}
						title={priority.title}
					/>
				}
			/>
			<p className={styles.key}>{issueKey}</p>
			<Link className={styles.summary} to={`/issue/${issueKey}`}>
				<span>{description}</span>
			</Link>
		</div>
	);
};

export default WorkIssueCard;
