import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import PeopleList from '../../components/PeopleList';
import TeamsList from '../../components/TeamsList';
import AddTeamPopup from '../../containers/CreateTeamModal';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import { fetchPeople } from '../../services/people.service';
import { fetchTeams } from '../../services/team.service';
import style from './style.module.scss';
import SearchField from '../../containers/SearchField';

const People: React.FC = (): ReactElement => {
	const history = useHistory();
	const [people, setPeople] = useState<null | WebApi.Entities.UserProfile[]>(null);
	const [teams, setTeams] = useState(null);
	const [isOpenAddNewTeamPopup, setIsOpenAddNewTeamPopup] = useState(false);

	useEffect(() => {
		(async function getPeople() {
			const response = await fetchPeople();
			setPeople(response);
		})();
		(async function getTeams() {
			const response = await fetchTeams();
			setTeams(response);
		})();
	}, []);

	const redirectToPersonProfile = (id: string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: string) => {
		history.push(`/team/${id}`);
	};

	return (
		<DefaultPageWrapper>
			<div className={style.btnContainer}>
				<Button onClick={() => setIsOpenAddNewTeamPopup(true)}>Create new Team</Button>
				<Button primary disabled>
					Add new people
				</Button>
			</div>
			<SearchField />
			<Header as="h2">People</Header>
			<PeopleList people={people} handlerClickItem={redirectToPersonProfile} className={style.listContainer} />
			<Header as="h2">Your teams</Header>
			<TeamsList teams={teams} handlerClickItem={redirectToTeamPage} className={style.listContainer} />
			<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
		</DefaultPageWrapper>
	);
};

export default People;
