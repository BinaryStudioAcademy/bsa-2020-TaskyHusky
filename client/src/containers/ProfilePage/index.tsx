import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import * as actions from './logiс/actions';
import ProfileHeader from 'components/ProfileHeader';
import { RootState } from 'typings/rootState';
import ProfileAside from 'components/ProfileAside';
import ProfileSection from 'components/ProfileSection';
import ProfileManagerSection from 'components/ProfileManagerSection';
import Spinner from 'components/common/Spinner';
import { useTranslation } from 'react-i18next';
import { requestGetUserProjects, requestGetUserTeams, requestTeammates } from 'services/user.service';
import { NotificationManager } from 'react-notifications';

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navLocation = location.search ? location.search.split('=')[1] : '';
	const { t } = useTranslation();

	const { userData, currentUser } = useSelector((state: RootState) => ({
		userData: state.user,
		currentUser: state.auth.user,
	}));
	const [user, setUser] = useState(userData);
	const { editMode, isLoading } = user;

	const isCurrentUser = currentUser ? id === currentUser.id : false;

	const showManager = (modeToShow: string) => {
		setUser({
			...user,
			editMode: modeToShow,
		});
		dispatch(actions.updateUser({ partialState: { editMode: modeToShow } }));
	};

	const activity = [
		{ id: 1, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 2, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 3, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 4, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 5, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 6, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
		{ id: 7, project: 'First scrum project', name: 'Fsp-1 Implement dark somethin else very important' },
	];

	const { projects, teammates, teams } = useSelector((state: RootState) => ({
		projects: state.projects.projects,
		teammates: state.peoplePage.people,
		teams: state.peoplePage.teams,
	}));

	const [data, setData] = useState({
		teammates,
		teams,
		projects,
	});

	const getUser = async () => {
		if (isCurrentUser) {
			setUser({ ...user, ...currentUser, isLoading: false, editMode: navLocation });
			dispatch(actions.updateUser({ partialState: { ...currentUser, isLoading: false, editMode: navLocation } }));
		} else {
			dispatch(actions.requestGetUser({ id }));
			setUser({ ...user, ...userData });
			Promise.all([requestGetUserTeams(id), requestGetUserProjects(id), requestTeammates(id)])
				.then((arr) => {
					setData({ ...data, teams: arr[0], projects: arr[1], teammates: arr[2] });
				})
				.catch((error) => {
					NotificationManager.error('Could not load data', 'Error', 4000);
				});
		}
	};

	const getCurrentUserData = async () => {
		setData({ ...data, projects, teammates, teams });
		if (!teams.length) {
			const teams = await requestGetUserTeams(id);
			setData((data) => ({ ...data, teams }));
		}
		if (!teammates.length) {
			const teammates = await requestTeammates(id);
			setData((data) => ({ ...data, teammates }));
		}
	};

	const updateUser = (changedUser: Partial<WebApi.Entities.UserProfile>) => {
		setUser({ ...user, ...changedUser });
	};

	useEffect(() => {
		getUser();
		//eslint-disable-next-line
	}, [userData.id, navLocation, id]);

	useEffect(() => {
		if (isCurrentUser) {
			getCurrentUserData();
		}
		//eslint-disable-next-line
	}, [projects, teammates, teams]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className={styles.wrapper}>
					<ProfileHeader title={isCurrentUser ? t('my_profile') : t('profile')} />
					<div className={styles.container}>
						<ProfileAside
							user={user}
							isCurrentUser={isCurrentUser}
							teams={data.teams}
							showManager={showManager}
						/>
						{editMode ? (
							<ProfileManagerSection user={user} showManager={showManager} updateUser={updateUser} />
						) : (
							<ProfileSection
								isCurrentUser={isCurrentUser}
								activity={activity}
								projects={data.projects}
								teammates={data.teammates}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
