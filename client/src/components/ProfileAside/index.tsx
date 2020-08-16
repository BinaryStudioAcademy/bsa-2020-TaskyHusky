import React from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
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
				avatar={avatar}
				firstName={firstName}
				lastName={lastName}
				username={username}
				editMode={editMode}
				isCurrentUser={isCurrentUser}
				showManager={showManager}
			/>
			<Segment>
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
						<ProfileContacntBlock email={email} isCurrentUser={isCurrentUser} />
						<ProfileTeamBlock isCurrentUser={isCurrentUser} mockData={mockData} />
						<Link to="#" className={styles.policyLink}>
							{t('view_privacy_policy')}
						</Link>
					</>
				)}
			</Segment>
		</aside>
	);
};

export default ProfileAside;
