import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	item: ActivityIssue;
}

const IssueActivityItem: React.FC<Props> = (props: Props) => {
	const {
		item: { type, summary, project, issueKey },
	} = props;

	return (
		<div className={styles.activityItem}>
			<Popup
				content={`Type: ${type.title}`}
				trigger={
					<Icon
						className={styles.icon}
						color={type.color as 'red'}
						key={`issueTypeIc-${type.id}`}
						name={`${type.icon}` as 'folder'}
					/>
				}
			/>
			<div className={styles.block}>
				<Link to={`/issue/${issueKey}`}>
					<span className={styles.content}>{summary}</span>
				</Link>
				<Link to={`/project/${project.id}/issues`}>
					<span className={styles.contentSecondary}>{project.name}</span>
				</Link>
			</div>
		</div>
	);
};

export default IssueActivityItem;
