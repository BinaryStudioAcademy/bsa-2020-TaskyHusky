import React, { ReactElement } from 'react';
import { Card, Image } from 'semantic-ui-react';
import style from './style.module.scss';

interface PeopleListItem {
	person: WebApi.Entities.User;
	handlerClick?: () => void;
}

const PeopleListItem: React.FC<PeopleListItem> = ({ person, handlerClick }): ReactElement => {
	const { firstName, lastName, avatar, jobTitle } = person;

	return (
		<Card onClick={() => handlerClick && handlerClick()} className={style.card}>
			<Card.Content>
				<Image size="tiny" src={avatar} circular centered className={style.avatar} />
				<Card.Header>
					{firstName} {lastName}
				</Card.Header>
				<Card.Meta>{jobTitle}</Card.Meta>
			</Card.Content>
		</Card>
	);
};

export default PeopleListItem;
