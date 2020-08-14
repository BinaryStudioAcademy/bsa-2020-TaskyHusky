import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Button, Loader } from 'semantic-ui-react';
import PeopleList from '../../components/PeopleList';
import TeamsList from '../../components/TeamsList';
import AddTeamPopup from '../../containers/CreateTeamModal';
import style from './style.module.scss';
import SearchField from '../../containers/SearchPeopleAndTeamField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import * as actions from './logic/actions';

const People: React.FC = (): ReactElement => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { isLoading, people, teams } = useSelector((state: RootState) => state.peoplePage);
	const [isOpenAddNewTeamPopup, setIsOpenAddNewTeamPopup] = useState(false);

	useEffect((): void => {
		dispatch(actions.startLoading());
	}, []);

	const redirectToPersonProfile = (id: string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: string) => {
		history.push(`/team/${id}`);
	};

	return (
		<main className={style.main}>
			<div className={style.btnContainer}>
				<Button onClick={() => setIsOpenAddNewTeamPopup(true)}>Create new Team</Button>
				<Button primary disabled>
					Add new people
				</Button>
			</div>
			<SearchField />
			{isLoading && <Loader active inline={'centered'} />}
			{!isLoading && (
				<>
					<Header as="h3">People</Header>
					<PeopleList
						people={people}
						handlerClickItem={redirectToPersonProfile}
						className={style.listContainer}
					/>
					<Header as="h3">Your teams</Header>
					<TeamsList teams={teams} handlerClickItem={redirectToTeamPage} className={style.listContainer} />
					<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
				</>
			)}
		</main>
	);
};

export default People;
