import React from 'react';
import { Person } from '../../MockData/people';
import { CardGroup, List } from 'semantic-ui-react';
import PeopleListItem from './PeopleListItem';

interface PeopleList {
	people: Person[];
	handlerClickItem: (id: number | string) => void;
}

const PeopleList: React.FC<PeopleList> = ({ people, handlerClickItem }: PeopleList) => (
	<CardGroup>
		{people.map((person: Person) => (
			<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</CardGroup>
);

export default PeopleList;
