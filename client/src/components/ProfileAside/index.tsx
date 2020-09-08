import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import ProfileAboutBlock from 'components/ProfileAboutBlock';
import ProfileContacntBlock from 'components/ProfileContactBlock';
import ProfileTeamBlock from 'components/ProfileTeamBlock';
import ManagerAsideBlock from 'components/ManagerAsideBlock';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import { ModeManager } from 'containers/ProfilePage';

interface Props {
	isCurrentUser: boolean;
	teams: Array<WebApi.Entities.Team>;
	user: Partial<UserProfileState>;
	editMode: string;
	showManager: (modeToShow: ModeManager) => void;
}

const ProfileAside: React.FC<Props> = (props: Props) => {
	const { user, isCurrentUser, teams, showManager, editMode } = props;
	const {
		avatar = '',
		firstName = '',
		lastName = '',
		username = '',
		jobTitle = '',
		department = '',
		organization = '',
		address = '',
		color = '',
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
				color={color}
			/>
			<div>
				{editMode ? (
					<ManagerAsideBlock showManager={showManager} editMode={editMode} googleId={user.googleId} />
				) : (
					<>
						<ProfileAboutBlock
							jobTitle={jobTitle}
							organization={organization}
							department={department}
							location={address}
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
