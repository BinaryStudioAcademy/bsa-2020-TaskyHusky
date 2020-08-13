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
	const [user, setUser] = useState<UserProfileState | null>(null);

	const currentUser = useSelector((state: RootState) => state.auth.user);
	const isCurrentUser = currentUser ? id === currentUser.id : false;
	const userData = useSelector((state: RootState) => state.user);
	const { editMode, isLoading } = userData;

	const showManager = (modeToShow: string) => {
		dispatch(actions.updateUser({ partialState: { editMode: modeToShow } }));
	};

	const mockData = {
		teams: [
			{ name: 'Example name1', members: 1, id: 1 },
			{ name: 'Example name2', members: 2, id: 2 },
		],
		activity: [
			{ id: 1, project: 'Example project1', name: 'Fsp-1 Implement dark mode color theme' },
			{ id: 2, project: 'Example project1', name: 'Fsp-1 Anonymus user shouldnt be able to loq in' },
			{ id: 3, project: 'Example project1', name: 'Fsp-1 Implement dark somethin else very important' },
			{ id: 4, project: 'Example project1', name: 'Fsp-1 Implement dark somethin else very important' },
			{ id: 5, project: 'Example project1', name: 'Fsp-1 Implement dark somethin else very important' },
			{ id: 6, project: 'Example project1', name: 'Fsp-1 Implement dark somethin else very important' },
			{ id: 7, project: 'Example project1', name: 'Fsp-1 Implement dark somethin else very important' },
		],
		project: 'Example project1',
	};

	const getUser = async () => {
		if (isCurrentUser) {
			dispatch(actions.updateUser({ partialState: { isLoading: false } }));
		} else {
			dispatch(actions.requestGetUser({ id }));
		}
	};

	useEffect(() => {
		getUser();
		//eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		setUser(userData);
	}, [userData]);
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
							<ProfileManagerSection user={user} showManager={showManager} />
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
