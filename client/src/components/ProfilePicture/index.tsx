import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { PropsExtendedData } from 'containers/ProfilePage';

const ProfilePicture: React.FC<PropsExtendedData> = (props: PropsExtendedData) => {
	const { user, isCurrentUser, showManager } = props;

	const getInitials = () => (user && user.firstName && user.lastName ? user.firstName[0] + user.lastName[0] : '');

	return (
		<>
			{user && (
				<div className={styles.container}>
					<div className={styles.mainInfo}>
						<div className={styles.mainInfo__avatarContainer}>
							<div className={styles.mainInfo__borderHelper}>
								{user.avatar ? (
									<img src={user.avatar} className={styles.mainInfo__avatar} alt="Avatar" />
								) : (
									<h1 className={styles.mainInfo__initials}>{getInitials()}</h1>
								)}
							</div>
						</div>
						<Header as="h2" className={styles.mainInfo__fullName}>
							{user.firstName} {user.lastName}
						</Header>
						{user.username && <p className={styles.mainInfo__username}>{user.username}</p>}
					</div>
					{isCurrentUser && showManager && (
						<Button
							className={styles.managerButton}
							onClick={() => showManager('profile')}
							disabled={!user.editMode ? false : true}
						>
							Manage your account
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export default ProfilePicture;
