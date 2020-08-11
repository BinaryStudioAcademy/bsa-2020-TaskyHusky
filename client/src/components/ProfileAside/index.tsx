import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProfileAboutBlock from 'components/ProfileAboutBlock';
import ProfileContacntBlock from 'components/ProfileContactBlock';
import ProfileTeamBlock from 'components/ProfileTeamBlock';
import ManagerAsideBlock from 'components/ManagerAsideBlock';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	isCurrentUser: boolean;
	mockData?: any;
	user: Partial<UserProfileState>;
	showManager: (modeToShow: string) => void;
}

const ProfileAside: React.FC<Props> = (props: Props) => {
	const { user, isCurrentUser, mockData, showManager } = props;
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
		email = '',
	} = user;
	return (
		<aside className={styles.userInfo}>
			<ProfilePicture
				avatar={avatar as keyof UserProfileState}
				firstName={firstName as keyof UserProfileState}
				lastName={lastName as keyof UserProfileState}
				username={username as keyof UserProfileState}
				editMode={editMode as keyof UserProfileState}
				isCurrentUser={isCurrentUser}
				showManager={showManager}
			/>
			<Segment>
				{editMode ? (
					<ManagerAsideBlock showManager={showManager} />
				) : (
					<>
						<ProfileAboutBlock
							jobTitle={jobTitle as keyof UserProfileState}
							organization={organization as keyof UserProfileState}
							department={department as keyof UserProfileState}
							location={location as keyof UserProfileState}
							isCurrentUser={isCurrentUser}
						/>
						<ProfileContacntBlock email={email as keyof UserProfileState} isCurrentUser={isCurrentUser} />
						<ProfileTeamBlock isCurrentUser={isCurrentUser} mockData={mockData} />
						<Link to="#" className={styles.policyLink}>
							View privacy policy
						</Link>
					</>
				)}
			</Segment>
		</aside>
	);
};

export default ProfileAside;
