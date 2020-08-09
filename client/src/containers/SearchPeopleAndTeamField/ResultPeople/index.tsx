import React from 'react';
import { Image } from 'semantic-ui-react';

const ResultPeople: React.FC<WebApi.Entities.UserProfile> = ({ firstName, lastName, avatar, email, id }) => (
	<div>
		<Image src={avatar} size="small" rounded centered wrapped />
		<b>
			{firstName} {lastName}
		</b>
		<p>{email}</p>
	</div>
);

export default React.memo(ResultPeople);
