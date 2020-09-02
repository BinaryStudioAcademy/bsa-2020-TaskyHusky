import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	item: ActivityIssue;
}

const IssueActivityItem: React.FC<Props> = (props: Props) => {
	const {
		item: { type, summary, project },
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
				<p className={styles.content}>{summary}</p>
				<p className={styles.contentSecondary}>{project.category} project</p>
			</div>
		</div>
	);
};

export default IssueActivityItem;
