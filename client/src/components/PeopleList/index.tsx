import React, { ReactElement } from 'react';
import { Person } from '../../mockData/people';
import PeopleListItem from './PeopleListItem';

interface PeopleList {
	people: Person[];
	handlerClickItem: (id: number | string) => void;
	className?: string;
}

const PeopleList: React.FC<PeopleList> = ({ people, handlerClickItem, className }): ReactElement => (
	<div className={className}>
		{people.map((person: Person) => (
			<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</div>
);

export default PeopleList;
