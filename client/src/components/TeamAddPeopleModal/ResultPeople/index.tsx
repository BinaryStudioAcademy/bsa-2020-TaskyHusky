import React from 'react';
import { Image } from 'semantic-ui-react';
import styles from './styles.module.scss';

const ResultPeople: React.FC<WebApi.Entities.UserProfile> = ({ firstName, lastName, avatar, email }) => (
	<div className={styles.search_result}>
		<Image src={avatar} size="small" rounded centered wrapped />
		<b>{`${firstName} ${lastName}`}</b>
		<p className={styles.email}>{email}</p>
	</div>
);

export default React.memo(ResultPeople);
