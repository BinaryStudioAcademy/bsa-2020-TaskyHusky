import React, { ReactElement } from 'react';
import UserAvatar from 'components/common/UserAvatar';
import styles from './style.module.scss';

interface Props {
	person: WebApi.Entities.UserProfile;
	handlerClick?: () => void;
	additionalBlock?: boolean;
}

const PeopleListItem: React.FC<Props> = ({ person, handlerClick, additionalBlock = false }): ReactElement => {
	const { firstName, lastName, jobTitle, color } = person;
	const fullname = () => `${firstName} ${lastName}`;
	return (
		<div
			onClick={() => handlerClick && handlerClick()}
			className={styles.card}
			style={additionalBlock ? { height: 0, overflow: 'hidden', margin: 0 } : {}}
		>
			<div className={styles.header}>
				<div className={styles.avatarWrapper}>
					<UserAvatar user={person} />
				</div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{fullname()}</p>
					<p className={styles.title}>{jobTitle}</p>
				</div>
			</div>
			<div className={styles.colorBlock} style={{ background: color ?? '#fece2f' }} />
		</div>
	);
};

export default React.memo(PeopleListItem);
