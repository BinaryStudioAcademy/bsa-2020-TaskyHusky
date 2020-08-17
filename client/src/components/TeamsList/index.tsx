import React, { ReactElement } from 'react';
import TeamListItem from './TeamListItem';

interface Props {
	teams: WebApi.Entities.Team[];
	handlerClickItem: (id: string) => void;
	className?: string;
}

const TeamsList: React.FC<Props> = ({ teams, handlerClickItem, className = '' }): ReactElement => (
	<div className={className}>
		{teams.map((person) => (
			<TeamListItem team={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</div>
);

export default React.memo(TeamsList);
