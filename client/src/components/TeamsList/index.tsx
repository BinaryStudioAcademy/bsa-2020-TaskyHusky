import React, { ReactElement } from 'react';
import TeamListItem from './TeamListItem';
import { Loader } from 'semantic-ui-react';

interface TeamsList {
	teams: WebApi.Entities.Team[];
	handlerClickItem: (id: string) => void;
	className?: string;
}

const TeamsList: React.FC<TeamsList> = ({ teams, handlerClickItem, className = '' }): ReactElement => (
	<div className={className}>
		{teams.map((person) => (
			<TeamListItem team={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
		))}
	</div>
);

export default React.memo(TeamsList);
