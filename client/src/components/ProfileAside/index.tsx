import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { propsUserData } from 'containers/ProfilePage';
import ProfileAboutBlock from 'components/ProfileAboutBlock';
import ProfileContacntBlock from 'components/ProfileContactBlock';
import ProfileTeamBlock from 'components/ProfileTeamBlock';

const ProfileAside = ({ data: { user, isCurrentUser, mockData } }: propsUserData) => {
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
			/>
			<Segment>
				<ProfileAboutBlock data={{ user, isCurrentUser }} />
				<ProfileContacntBlock data={{ user, isCurrentUser }} />
				<ProfileTeamBlock data={{ user, isCurrentUser, mockData }} />
				<Link to="#" className={styles.policyLink}>
					View privacy policy
				</Link>
			</Segment>
		</aside>
	);
};

export default ProfileAside;
