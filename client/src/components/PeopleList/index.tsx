import React, { FunctionComponent } from 'react';
import { Person } from '../../MockData/people';
import { CardGroup, List } from 'semantic-ui-react';
import PeopleListItem from './PeopleListItem';

interface PeopleList {
	people: Person[];
}

const PeopleList = ({ people }: PeopleList) => (
	<CardGroup>
		{people.map((person: Person) => (
			<PeopleListItem person={person} key={person.id} />
		))}
	</CardGroup>
);

export default PeopleList;
