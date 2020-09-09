import React, { ReactElement } from 'react';
import PeopleListItem from './PeopleListItem';

interface Props {
	people: WebApi.Entities.UserProfile[];
	handlerClickItem: (id: string) => void;
}

const PeopleList: React.FC<Props> = ({ people, handlerClickItem }): ReactElement => {
	const additionalLoad = 6;

	return (
		<div className="cardContainer">
			{people.map((person: WebApi.Entities.UserProfile) => (
				<PeopleListItem person={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
			))}
			{people.map(
				(person: WebApi.Entities.UserProfile, index) =>
					index < additionalLoad && (
						<PeopleListItem
							person={person}
							handlerClick={() => handlerClickItem(person.id)}
							key={person.id}
							additionalBlock={true}
						/>
					),
			)}
		</div>
	);
};

export default React.memo(PeopleList);
