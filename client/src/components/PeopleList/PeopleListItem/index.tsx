import React, { ReactElement } from 'react';
import UserAvatar from 'components/common/UserAvatar';
import styles from './style.module.scss';

interface Props {
	person: WebApi.Entities.UserProfile;
	handlerClick?: () => void;
}

const PeopleListItem: React.FC<Props> = ({ person, handlerClick }): ReactElement => {
	const { firstName, lastName, jobTitle } = person;
	const fullname = () => `${firstName} ${lastName}`;
	return (
		<div onClick={() => handlerClick && handlerClick()} className={styles.card}>
			<div className={styles.header}>
				<div className={styles.avatarWrapper}>
					<UserAvatar user={person} />
				</div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{fullname()}</p>
					<p className={styles.title}>{jobTitle}</p>
				</div>
			</div>
			<div className={styles.colorBlock} style={{ background: '#fece2f' }} />
		</div>
	);
};

export default React.memo(PeopleListItem);
