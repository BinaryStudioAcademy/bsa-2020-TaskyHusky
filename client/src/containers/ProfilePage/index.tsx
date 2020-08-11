import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import * as actions from './logiс/actions';
import ProfileHeader from 'components/ProfileHeader';
import { RootState } from 'typings/rootState';
import ProfileAside from 'components/ProfileAside';
import ProfileSection from 'components/ProfileSection';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import ProfileManagerSection from 'components/ProfileManagerSection';
import { requestGetUser } from 'services/user.service';
import Spinner from 'components/common/Spinner';

export interface PropsExtendedData {
	isCurrentUser: boolean;
	mockData?: any;
	user?: Partial<UserProfileState>;
	showManager: (modeToShow: string) => void;
}

export interface PropsUserData {
	isCurrentUser: boolean;
	mockData?: any;
	user: Partial<UserProfileState>;
}

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const userData = useSelector((state: RootState) => state.user);
	const [user, setUser] = useState(userData);
	const currentUserId = useSelector((state: RootState) => state.auth.user && state.auth.user.id);

	const isCurrentUser = id === currentUserId;
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
			dispatch(actions.requestGetUser({ id }));
		} else {
			const requestedUser = await requestGetUser(id);
			setUser({ ...user, ...requestedUser });
			dispatch(actions.updateUser({ partialState: { isLoading: false } }));
		}
	};

	useEffect(() => {
		getUser();
	}, [isCurrentUser]);

	useEffect(() => {
		if (isCurrentUser) {
			setUser({ ...user, ...userData });
		}
	}, [userData]);

	return (
		<>
			{userData.isLoading ? (
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
						{user.editMode ? (
							<ProfileManagerSection user={user} showManager={showManager} />
						) : (
							<ProfileSection user={user} isCurrentUser={isCurrentUser} mockData={mockData} />
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
