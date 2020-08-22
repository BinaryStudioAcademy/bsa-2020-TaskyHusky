import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import * as actions from './logiс/actions';
import ProfileHeader from 'components/ProfileHeader';
import { RootState } from 'typings/rootState';
import ProfileAside from 'components/ProfileAside';
import ProfileSection from 'components/ProfileSection';
import ProfileManagerSection from 'components/ProfileManagerSection';
import Spinner from 'components/common/Spinner';
import { UserProfileState, initialState } from './logiс/state';
import { useTranslation } from 'react-i18next';
import { requestGetUserProjects, requestGetUserTeams } from 'services/user.service';
import { fetchPeople } from 'services/people.service';

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [user, setUser] = useState(initialState);
	const { editMode, isLoading } = user;
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const userData = useSelector((state: RootState) => state.user);

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

	const projects = useSelector((state: RootState) => state.projects.projects);
	const teammates = useSelector((state: RootState) => state.peoplePage.people);
	const teams = useSelector((state: RootState) => state.peoplePage.teams);

	const [data, setData] = useState({
		teammates,
		teams,
		projects,
	});

	const getUser = async () => {
		if (isCurrentUser) {
			setUser({ ...user, ...currentUser, isLoading: false });
			dispatch(actions.updateUser({ partialState: { ...currentUser, isLoading: false } }));

			if (!data.teammates.length) {
				const teammates = await fetchPeople(id);
				setData({ ...data, teammates });
			}
			if (!teams.length) {
				const teams = await requestGetUserTeams(id);
				setData({ ...data, teams });
			}
		} else {
			dispatch(actions.requestGetUser({ id }));
			setUser({ ...user, ...userData });
			const teammates = await fetchPeople(id);
			const teams = await requestGetUserTeams(id);
			const projects = await requestGetUserProjects(id);
			setData({ ...data, teammates, teams, projects });
		}
	};

	const updateUser = (changedUser: Partial<UserProfileState>) => {
		setUser({ ...user, ...changedUser });
	};

	useEffect(() => {
		getUser();
		//eslint-disable-next-line
	}, [userData.id]);

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
