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
import { UserProfileState, initialState } from './logiс/state';
import { useTranslation } from 'react-i18next';
import { requestGetUserProjects } from 'services/user.service';

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navLocation = location.search ? location.search.split('=')[1] : '';
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

	const mockData = {
		teams: [
			{ name: 'Example name1', members: 1, id: 1 },
			{ name: 'Example name2', members: 2, id: 2 },
		],
		activity: [
			{ id: 1, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 2, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 3, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 4, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 5, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 6, project: 'First scrum project', name: 'Homepage footer uses an inline style-should use a class' },
			{ id: 7, project: 'First scrum project', name: 'Fsp-1 Implement dark somethin else very important' },
		],
		colleagues: [
			{ id: 1, project: 'Software project', name: 'Fan Angel' },
			{ id: 2, project: 'Software project', name: 'Fan Angel' },
		],
	};

	let projects = useSelector((state: RootState) => state.projects.projects);

	const getUser = async () => {
		console.log(navLocation);
		if (isCurrentUser) {
			setUser({ ...user, ...currentUser, isLoading: false, editMode: navLocation });
			dispatch(actions.updateUser({ partialState: { ...currentUser, isLoading: false, editMode: navLocation } }));
		} else {
			dispatch(actions.requestGetUser({ id }));
			setUser({ ...user, ...userData });
			projects = await requestGetUserProjects(id);
		}
	};

	const updateUser = (changedUser: Partial<UserProfileState>) => {
		setUser({ ...user, ...changedUser });
	};

	useEffect(() => {
		getUser();
		//eslint-disable-next-line
	}, [userData.id, navLocation]);

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
							mockData={mockData}
							showManager={showManager}
						/>
						{editMode ? (
							<ProfileManagerSection user={user} showManager={showManager} updateUser={updateUser} />
						) : (
							<ProfileSection isCurrentUser={isCurrentUser} mockData={mockData} projects={projects} />
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
