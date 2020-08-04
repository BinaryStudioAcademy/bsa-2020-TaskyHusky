import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Person } from '../../../MockData/people';

interface PeopleListItem {
	person: Person;
	handlerClick?: () => void;
}

const PeopleListItem: React.FC<PeopleListItem> = ({ person, handlerClick }) => {
	const { firstName, lastName, avatar, role } = person;

	return (
		<Card onClick={() => handlerClick && handlerClick()}>
			<Card.Content>
				<Image floated="right" size="mini" src={avatar} />
				<Card.Header>
					{firstName} {lastName}
				</Card.Header>
				<Card.Meta>{role}</Card.Meta>
			</Card.Content>
		</Card>
	);
};

export default PeopleListItem;
