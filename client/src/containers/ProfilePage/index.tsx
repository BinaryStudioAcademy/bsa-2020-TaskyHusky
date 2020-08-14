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

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
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
		projects: [
			{ id: 1, project: 'Software project', name: 'Project 1' },
			{ id: 2, project: 'Software project', name: 'Project 2' },
			{ id: 3, project: 'Software project', name: 'Project 3' },
			{ id: 4, project: 'Software project', name: 'Project 4' },
		],
		colleagues: [
			{ id: 1, project: 'Software project', name: 'Fan Angel' },
			{ id: 2, project: 'Software project', name: 'Fan Angel' },
		],
	};

	const getUser = async () => {
		if (isCurrentUser) {
			setUser({ ...user, ...currentUser, isLoading: false });
			dispatch(actions.updateUser({ partialState: { ...currentUser, isLoading: false } }));
		} else {
			dispatch(actions.requestGetUser({ id }));
			setUser({ ...user, ...userData });
		}
	};

	const updateUser = (changedUser: Partial<UserProfileState>) => {
		setUser({ ...user, ...changedUser });
	};

	useEffect(() => {
		getUser();
		//eslint-disable-next-line
	}, [id]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className={styles.wrapper}>
					<ProfileHeader />
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
							<ProfileSection isCurrentUser={isCurrentUser} mockData={mockData} />
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
