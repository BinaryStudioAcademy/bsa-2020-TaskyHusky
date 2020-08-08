import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { people } from '../../mockData/people';
import { teams } from '../../mockData/teams';
import PeopleList from '../../components/PeopleList';
import TeamsList from '../../components/TeamsList';
import AddTeamPopup from '../../containers/AddTeamPopup';
import style from './style.module.scss';

const People: React.FC = (): ReactElement => {
	const history = useHistory();
	const [isOpenAddNewTeamPopup, setIsOpenAddNewTeamPopup] = useState(false);

	const redirectToPersonProfile = (id: number | string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: number | string) => {
		history.push(`/team/${id}`);
	};

	return (
		<div>
			<div className={style.btnContainer}>
				<Button onClick={() => setIsOpenAddNewTeamPopup(true)}>Create new Team</Button>
				<Button primary disabled>
					Add new people
				</Button>
			</div>
			<Header as="h2">People</Header>
			<PeopleList people={people} handlerClickItem={redirectToPersonProfile} className={style.listContainer} />
			<Header as="h2">Your teams</Header>
			<TeamsList teams={teams} handlerClickItem={redirectToTeamPage} className={style.listContainer} />
			<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
		</div>
	);
};

export default People;
