import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
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
import ProfileHeader from 'components/ProfileHeader';

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
	}, [dispatch, authStore.user]);

	const redirectToPersonProfile = (id: string) => {
		history.push(`/profile/${id}`);
	};

	const redirectToTeamPage = (id: string) => {
		history.push(`/team/${id}`);
	};

	return (
		<main className={style.main}>
			<ProfileHeader title={t('people_and_teams')} />
			<div className={style.mainHeader}>
				<SearchField />
				<div className={style.btnContainer}>
					<Button onClick={() => setIsOpenAddNewTeamPopup(true)} className={`primaryBtn ${style.button}`}>
						<span className={style.editBtnValue}>{t('create_team')} </span>
					</Button>
					<Button className={`primaryBtn ${style.button}`} onClick={() => setIsAddPeople(true)}>
						{t('add_people')}
					</Button>
				</div>
			</div>
			{isLoading && <Loader active inline={'centered'} />}
			{!isLoading && (
				<div className={style.container}>
					<h3 className={style.contentHeader}>{t('people')}</h3>
					<PeopleList people={people} handlerClickItem={redirectToPersonProfile} />
					<h3 className={style.contentHeader}>{t('your_teams')}</h3>
					<TeamsList teams={teams} handlerClickItem={redirectToTeamPage} />
					<AddTeamPopup isOpen={isOpenAddNewTeamPopup} closeClb={() => setIsOpenAddNewTeamPopup(false)} />
					<AddPeopleModal isOpen={isAddPeople} closeClb={() => setIsAddPeople(false)} />
				</div>
			)}
		</main>
	);
};

export default People;
