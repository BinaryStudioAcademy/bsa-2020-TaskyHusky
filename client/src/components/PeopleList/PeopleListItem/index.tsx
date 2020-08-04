import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Person } from '../../../MockData/people';

interface PeopleListItem {
	person: Person;
}

const PeopleListItem = ({ person }: PeopleListItem) => {
	const { id, firstName, lastName, avatar, role } = person;

	return (
		<Card href={`/user/${id}`}>
			<Image src={avatar} wrapped ui={false} />
			<Card.Content>
				<Card.Header>
					{firstName} {lastName}
				</Card.Header>
				<Card.Meta>
					<span>{role}</span>
				</Card.Meta>
			</Card.Content>
		</Card>
	);
};

export default PeopleListItem;
