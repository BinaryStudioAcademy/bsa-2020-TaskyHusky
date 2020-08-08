import React, { ReactElement } from 'react';
import { Team } from '../../fakeServer/mockData/teams';
import TeamListItem from './TeamListItem';
import { Loader } from 'semantic-ui-react';

interface TeamsList {
	teams: Team[] | null;
	handlerClickItem: (id: string) => void;
	className?: string;
}

const TeamsList: React.FC<TeamsList> = ({ teams, handlerClickItem, className = '' }): ReactElement => {
	if (teams) {
		return (
			<div className={className}>
				{teams.map((person: Team) => (
					<TeamListItem team={person} handlerClick={() => handlerClickItem(person.id)} key={person.id} />
				))}
			</div>
		);
	}

	return <Loader active inline="centered" />;
};

export default React.memo(TeamsList);
