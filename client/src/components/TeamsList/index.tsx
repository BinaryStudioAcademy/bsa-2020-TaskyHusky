import React, { ReactElement } from 'react';
import TeamListItem from './TeamListItem';

interface Props {
	teams: WebApi.Entities.Team[];
	handlerClickItem: (id: string) => void;
}

const TeamsList: React.FC<Props> = ({ teams, handlerClickItem }): ReactElement => {
	const additionalLoad = 6;

	return (
		<div className="cardContainer">
			{teams.map((person) => (
				<TeamListItem team={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
			))}
			{teams.map(
				(person, index) =>
					index < additionalLoad && (
						<TeamListItem
							team={person}
							handlerClick={() => handlerClickItem(person.id)}
							key={person.id}
							additionalBlock={true}
						/>
					),
			)}
		</div>
	);
};

export default React.memo(TeamsList);
