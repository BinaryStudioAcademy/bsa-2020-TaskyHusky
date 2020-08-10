import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PropsExtendedData } from 'containers/ProfilePage';
import ProfileAboutBlock from 'components/ProfileAboutBlock';
import ProfileContacntBlock from 'components/ProfileContactBlock';
import ProfileTeamBlock from 'components/ProfileTeamBlock';
import ManagerAsideBlock from 'components/ManagerAsideBlock';

const ProfileAside: React.FC<PropsExtendedData> = (props: PropsExtendedData) => {
	const { user, isCurrentUser, mockData, showManager } = props;
	return (
		<aside className={styles.userInfo}>
			<ProfilePicture
				user={{
					avatar: user.avatar,
					firstName: user.firstName,
					lastName: user.lastName,
					username: user.username,
				}}
				isCurrentUser={isCurrentUser}
				showManager={showManager}
			/>
			<Segment>
				{user.editMode ? (
					<ManagerAsideBlock showManager={showManager} />
				) : (
					<>
						<ProfileAboutBlock user={user} isCurrentUser={isCurrentUser} />
						<ProfileContacntBlock user={user} isCurrentUser={isCurrentUser} />
						<ProfileTeamBlock user={user} isCurrentUser={isCurrentUser} mockData={mockData} />
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