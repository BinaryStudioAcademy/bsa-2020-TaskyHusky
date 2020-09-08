import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';

const ResultPeople: React.FC<WebApi.Entities.UserProfile> = ({ firstName, lastName, avatar, email, color }) => (
	<div className={styles.searchResult}>
		<div>
			<b>{`${firstName} ${lastName}`}</b>
			<p className={styles.email}>{email}</p>
		</div>
		<Avatar fullName={`${firstName} ${lastName}`} imgSrc={avatar} color={color} />
	</div>
);

export default React.memo(ResultPeople);
