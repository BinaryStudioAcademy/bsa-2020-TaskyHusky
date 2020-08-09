import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Button, Loader, Message } from 'semantic-ui-react';
import PeopleList from '../../components/PeopleList';
import TeamsList from '../../components/TeamsList';
import AddTeamPopup from '../../containers/CreateTeamModal';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import { fetchPeople } from '../../services/people.service';
import { fetchTeams } from '../../services/team.service';
import style from './style.module.scss';
import SearchField from '../../containers/SearchPeopleAndTeamField';
import { Team } from '../../fakeServer/mockData/teams';

const People: React.FC = (): ReactElement => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<null | string>(null);
	const [people, setPeople] = useState<WebApi.Entities.UserProfile[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [isOpenAddNewTeamPopup, setIsOpenAddNewTeamPopup] = useState(false);

	useEffect((): void => {
		Promise.all([fetchPeople(), fetchTeams()])
			.then((response) => {
				const [people, teams] = response;
				setPeople(people);
				setTeams(teams);
			})
			.catch((error) => {
				setIsError(`Status: ${error.status}. ${error.statusText}`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const redirectToPersonProfile = (id: string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: string) => {
		history.push(`/team/${id}`);
	};

	return (
		<DefaultPageWrapper>
			<main className={style.main}>
				<div className={style.btnContainer}>
					<Button onClick={() => setIsOpenAddNewTeamPopup(true)}>Create new Team</Button>
					<Button primary disabled>
						Add new people
					</Button>
				</div>
				<SearchField />
				{isLoading && <Loader active inline={'centered'} />}
				{isError && <Message color={'red'}>{isError}</Message>}
				{!isLoading && !isError && (
					<>
						<Header as="h3">People</Header>
						<PeopleList
							people={people}
							handlerClickItem={redirectToPersonProfile}
							className={style.listContainer}
						/>
						<Header as="h3">Your teams</Header>
						<TeamsList
							teams={teams}
							handlerClickItem={redirectToTeamPage}
							className={style.listContainer}
						/>
						<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
					</>
				)}
			</main>
		</DefaultPageWrapper>
	);
};

export default People;
