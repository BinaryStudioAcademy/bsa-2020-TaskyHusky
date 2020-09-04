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
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import {
	requestGetUserProjects,
	requestGetUserTeams,
	requestTeammates,
	requestGetUserIssues,
} from 'services/user.service';

export enum ModeManager {
	main = '',
	email = 'emailManager',
	account = 'accountManager',
	profile = 'profileManager',
	security = 'securityManager',
}

const ProfilePage = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { userData, currentUser } = useSelector((state: RootState) => ({
		userData: state.user,
		currentUser: state.auth.user,
	}));
	const { projects, teammates, teams, activity } = useSelector((state: RootState) => ({
		projects: state.projects.projects,
		teammates: state.peoplePage.people,
		teams: state.peoplePage.teams,
		activity: state.userActivity.recentActivity,
	}));

	const [data, setData] = useState({
		teammates,
		teams,
		projects,
		activity,
	});
	const [user, setUser] = useState(userData);
	const { isLoading } = user;
	const [editMode, setEditMode] = useState<ModeManager>(ModeManager.main);
	const [isLoadAdditioanl, setIsLoadAdditional] = useState<boolean>(true);
	const isCurrentUser = currentUser ? id === currentUser.id : false;

	const showManager = (modeToShow: ModeManager) => {
		setEditMode(modeToShow);
	};

	const getUser = async () => {
		if (isCurrentUser) {
			setUser({ ...user, ...currentUser, isLoading: false });
			dispatch(actions.updateUser({ partialState: { ...currentUser, isLoading: false } }));
		} else {
			dispatch(actions.requestGetUser({ id }));
			setUser({ ...user, ...userData });
			Promise.all([
				requestGetUserTeams(id),
				requestGetUserProjects(id),
				requestTeammates(id),
				requestGetUserIssues(id),
			])
				.then((arr) => {
					const { recentActivity } = arr[3];
					setIsLoadAdditional(false);
					setData({ ...data, teams: arr[0], projects: arr[1], teammates: arr[2], activity: recentActivity });
				})
				.catch((error) => {
					NotificationManager.error('Could not load data', 'Error', 4000);
				});
		}
	};

	const getCurrentUserData = async () => {
		setData({ ...data, projects, teammates, teams, activity });
		if (!teams.length) {
			const teams = await requestGetUserTeams(id);
			setData((data) => ({ ...data, teams }));
		}
		if (!teammates.length) {
			const teammates = await requestTeammates(id);
			setData((data) => ({ ...data, teammates }));
		}
		if (!activity.length) {
			const { recentActivity } = await requestGetUserIssues(id);
			setData((data) => ({ ...data, activity: recentActivity }));
		}
		setIsLoadAdditional(false);
	};

	const updateUser = (changedUser: Partial<WebApi.Entities.UserProfile>) => {
		setUser({ ...user, ...changedUser });
	};

	useEffect(() => {
		getUser();
		setIsLoadAdditional(true);
		//eslint-disable-next-line
	}, [userData.id, id]);

	useEffect(() => {
		if (isCurrentUser) {
			getCurrentUserData();
		}
		//eslint-disable-next-line
	}, [projects, teammates, teams, activity, isCurrentUser]);

	return (
		<>
			{isLoading || isLoadAdditioanl ? (
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
							editMode={editMode}
						/>
						{editMode ? (
							<ProfileManagerSection
								user={user}
								editMode={editMode}
								showManager={showManager}
								updateUser={updateUser}
							/>
						) : (
							<ProfileSection
								isCurrentUser={isCurrentUser}
								activity={data.activity}
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
