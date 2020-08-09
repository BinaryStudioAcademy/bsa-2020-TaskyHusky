import React from 'react';
import { Image } from 'semantic-ui-react';

const ResultPeople = ({ firstName, lastName, avatar, email, id }: WebApi.Entities.UserProfile) => (
	<div>
		<Image src={avatar} size={'small'} rounded centered wrapped />
		<b>
			{firstName} {lastName}
		</b>
		<p>{email}</p>
	</div>
);

export default ResultPeople;
