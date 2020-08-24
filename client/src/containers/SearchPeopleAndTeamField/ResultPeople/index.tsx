import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import style from './styles.module.scss';

const ResultPeople: React.FC<WebApi.Entities.UserProfile> = ({ firstName, lastName, avatar, email, id }) => (
	<Link to={`/profile/${id}`} className={style.user}>
		<Image src={avatar} size="small" rounded centered wrapped />
		<b>
			{firstName} {lastName}
		</b>
		<p>{email}</p>
	</Link>
);

export default React.memo(ResultPeople);
