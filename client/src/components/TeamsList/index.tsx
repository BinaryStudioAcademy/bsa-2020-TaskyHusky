import React, { ReactElement } from 'react';
import { Team } from '../../mockData/teams';
import TeamListItem from './TeamListItem';

interface TeamsList {
	teams: Team[];
	handlerClickItem: (id: number | string) => void;
	className?: string;
}

const TeamsList: React.FC<TeamsList> = ({ teams, handlerClickItem, className = '' }): ReactElement => (
	<div className={className}>
		{teams.map((person: Team) => (
			<TeamListItem team={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</div>
);

export default TeamsList;
