import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
	issueKey: string;
	description: string;
	type: WebApi.Entities.IssueType;
}

const WorkIssueCard: React.FC<Props> = (props: Props) => {
	const { issueKey, description, type } = props;
	return (
		<div className={styles.issue}>
			<Icon name={type.icon as any} color={type.color as any} title={type.title} />
			<p className={styles.key}>{issueKey}</p>
			<p className={styles.summary}>
				<Link to={`issue/${issueKey}`}>{description}</Link>
			</p>
		</div>
	);
};

export default WorkIssueCard;
