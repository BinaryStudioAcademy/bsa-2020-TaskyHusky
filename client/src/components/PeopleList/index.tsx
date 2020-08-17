import React, { ReactElement } from 'react';
import PeopleListItem from './PeopleListItem';

interface Props {
	people: WebApi.Entities.UserProfile[];
	handlerClickItem: (id: string) => void;
	className?: string;
}

const PeopleList: React.FC<Props> = ({ people, handlerClickItem, className }): ReactElement => (
	<div className={className}>
		{people.map((person: WebApi.Entities.UserProfile) => (
			<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</div>
);

export default React.memo(PeopleList);
