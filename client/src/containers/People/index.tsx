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
import { useTranslation } from 'react-i18next';
import AddPeopleModal from '../../components/AddPeopleModal';

const People: React.FC = (): ReactElement => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { isLoading, people, teams } = useSelector((state: RootState) => state.peoplePage);
	const [isOpenAddNewTeamPopup, setIsOpenAddNewTeamPopup] = useState(false);
	const [isAddPeople, setIsAddPeople] = useState(false);
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);

	useEffect((): void => {
		dispatch(actions.startLoading({ id: authStore.user?.id || '' }));
	}, [dispatch]);

	const redirectToPersonProfile = (id: string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: string) => {
		history.push(`/team/${id}`);
	};

	return (
		<main className={style.main}>
			<div className={style.btnContainer}>
				<Button onClick={() => setIsOpenAddNewTeamPopup(true)}>{t('create_team')}</Button>
				<Button primary onClick={() => setIsAddPeople(true)}>
					{t('add_people')}
				</Button>
			</div>
			<SearchField />
			{isLoading && <Loader active inline={'centered'} />}
			{!isLoading && (
				<>
					<Header as="h3">{t('people')}</Header>
					<PeopleList
						people={people}
						handlerClickItem={redirectToPersonProfile}
						className={style.listContainer}
					/>
					<Header as="h3">{t('your_teams')}</Header>
					<TeamsList teams={teams} handlerClickItem={redirectToTeamPage} className={style.listContainer} />
					<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
					<AddPeopleModal isOpen={isAddPeople} closeClb={() => setIsAddPeople(false)} />
				</>
			)}
		</main>
	);
};

export default People;
