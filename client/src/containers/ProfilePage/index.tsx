import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import * as actions from './logiс/actions';
import ProfileHeader from 'components/ProfileHeader';
import { RootState } from 'typings/rootState';
import ProfileAside from 'components/ProfileAside';
import ProfileSection from 'components/ProfileSection';
import { UserProfileState, initialState } from 'containers/ProfilePage/logiс/state';
import ProfileManagerSection from 'components/ProfileManagerSection';

export interface PropsExtendedData {
	isCurrentUser: boolean;
	mockData?: any;
	user: Partial<UserProfileState>;
	showManager: (modeToShow: string) => void;
}

export interface PropsUserData {
	isCurrentUser: boolean;
	mockData?: any;
	user: Partial<UserProfileState>;
}

const ProfilePage = ({ match: { params } }: { match: any }) => {
	const dispatch = useDispatch();
	const userData = useSelector((state: RootState) => state.user);
	const [user, setUser] = useState(initialState);

	const isCurrentUser = user.id === userData.id;
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

	useEffect(() => {
		dispatch(actions.requestGetUser({ id: params.id }));
	}, [dispatch, params.id]);

	useEffect(() => {
		setUser({ ...user, ...userData });
	}, [userData]);

	if (!user.id) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<ProfileHeader />
			<div className={styles.container}>
				<ProfileAside user={user} isCurrentUser={isCurrentUser} mockData={mockData} showManager={showManager} />
				{user.editMode ? (
					<ProfileManagerSection user={user} showManager={showManager} />
				) : (
					<ProfileSection user={user} isCurrentUser={isCurrentUser} mockData={mockData} />
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
