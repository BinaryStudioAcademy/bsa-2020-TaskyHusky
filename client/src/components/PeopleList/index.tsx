import React, { ReactElement } from 'react';
import PeopleListItem from './PeopleListItem';
import { Loader } from 'semantic-ui-react';

interface PeopleList {
	people: WebApi.Entities.User[] | null;
	handlerClickItem: (id: string) => void;
	className?: string;
}

const PeopleList: React.FC<PeopleList> = ({ people, handlerClickItem, className }): ReactElement => {
	if (people) {
		return (
			<div className={className}>
				{people.map((person: WebApi.Entities.User) => (
					<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
				))}
			</div>
		);
	}

	return <Loader active inline="centered" />;
};

export default React.memo(PeopleList);
