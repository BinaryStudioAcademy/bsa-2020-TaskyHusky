import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import ProfileAboutBlock from 'components/ProfileAboutBlock';
import ProfileContacntBlock from 'components/ProfileContactBlock';
import ProfileTeamBlock from 'components/ProfileTeamBlock';
import ManagerAsideBlock from 'components/ManagerAsideBlock';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	isCurrentUser: boolean;
	teams: Array<WebApi.Entities.Team>;
	user: Partial<UserProfileState>;
	showManager: (modeToShow: string) => void;
}

const ProfileAside: React.FC<Props> = (props: Props) => {
	const { user, isCurrentUser, teams, showManager } = props;
	const {
		avatar = '',
		firstName = '',
		lastName = '',
		username = '',
		editMode = '',
		jobTitle = '',
		department = '',
		organization = '',
		location = '',
	} = user;
	return (
		<aside className={styles.userInfo}>
			<ProfilePicture
				avatar={avatar}
				firstName={firstName}
				lastName={lastName}
				username={username}
				editMode={editMode}
				isCurrentUser={isCurrentUser}
				showManager={showManager}
			/>
			<div>
				{editMode ? (
					<ManagerAsideBlock showManager={showManager} />
				) : (
					<>
						<ProfileAboutBlock
							jobTitle={jobTitle}
							organization={organization}
							department={department}
							location={location}
							isCurrentUser={isCurrentUser}
						/>
						<ProfileContacntBlock />
						<ProfileTeamBlock teams={teams} />
					</>
				)}
			</div>
		</aside>
	);
};

export default ProfileAside;
