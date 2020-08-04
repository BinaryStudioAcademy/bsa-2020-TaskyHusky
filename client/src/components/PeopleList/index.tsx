import React, { ReactElement } from 'react';
import { Person } from '../../MockData/people';
import { CardGroup } from 'semantic-ui-react';
import PeopleListItem from './PeopleListItem';

interface PeopleList {
	people: Person[];
	handlerClickItem: (id: number | string) => void;
}

const PeopleList: React.FC<PeopleList> = ({ people, handlerClickItem }: PeopleList): ReactElement => (
	<CardGroup>
		{people.map((person: Person) => (
			<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</CardGroup>
);

export default PeopleList;
