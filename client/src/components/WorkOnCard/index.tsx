import React, { useState } from 'react';
import moment from 'moment';
import styles from './styles.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ModalViewProject from 'components/common/ModalViewProject';
import { ActivityIssue } from 'containers/WorkPage/logic/state';

interface Props {
	issue: ActivityIssue;
}

const WorkOnCard: React.FC<Props> = (props: Props) => {
	const {
		issue: { issueKey, summary, type, project, updatedAt, priority },
	} = props;
	const [modal, setModal] = useState<boolean>(false);
	const hideModal = (e: React.BaseSyntheticEvent) => {
		if (
			!e.target.classList.contains('avatar') &&
			!e.target.classList.contains('blockWrapper') &&
			!e.target.classList.contains('avatarTitle')
		) {
			setModal(false);
		}
	};
	const onHover = () => {
		setModal(true);
	};
	return (
		<div className={styles.issue}>
			<div className={styles.avatar} onMouseEnter={onHover} onMouseLeave={(e) => hideModal(e)}>
				<p className={styles.avatarTitle} onMouseEnter={onHover}>
					{project.name[0]}
				</p>
				{modal && <ModalViewProject project={project} onClose={hideModal} />}
			</div>
			<Link to={`issue/${issueKey}`} className={styles.content}>
				<div className={styles.mainInfo}>
					<p className={styles.key}>{issueKey}</p>
					<p className={styles.summary}>{summary}</p>
					{priority && (
						<Popup
							content={`Priority: ${priority.title}`}
							trigger={
								<Icon
									key={`priorityIc-${priority.id}`}
									color={priority.color as 'red'}
									name={priority.icon as 'arrow up'}
								/>
							}
						/>
					)}
				</div>
				<div className={`${styles.mainInfo} ${styles.hidden}`}>
					<Popup
						content={`Type: ${type.title}`}
						trigger={
							<Icon
								name={type.icon as any}
								color={type.color as any}
								title={type.title}
								className={styles.icon}
							/>
						}
					/>
					<p className={styles.date}>{moment(updatedAt).format('LLL')}</p>
				</div>
			</Link>
		</div>
	);
};

export default WorkOnCard;
