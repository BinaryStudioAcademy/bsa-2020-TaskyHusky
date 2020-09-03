import React from 'react';
import styles from './styles.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
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
			<Popup
				content={`Type: ${type.title}`}
				trigger={
					<Icon
						name={type.icon as any}
						color={type.color as any}
						className={styles.icon}
						title={type.title}
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
