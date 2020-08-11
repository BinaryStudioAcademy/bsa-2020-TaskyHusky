import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { PropsExtendedData } from 'containers/ProfilePage';

const ProfilePicture: React.FC<PropsExtendedData> = (props: PropsExtendedData) => {
	const {
		user: { avatar, username, firstName, lastName, editMode },
		isCurrentUser,
		showManager,
	} = props;

	const getInitials = () => (firstName && lastName ? firstName[0] + lastName[0] : '');

	return (
		<div className={styles.container}>
			<div className={styles.mainInfo}>
				<div className={styles.mainInfo__avatarContainer}>
					<div className={styles.mainInfo__borderHelper}>
						{avatar ? (
							<img src={avatar} className={styles.mainInfo__avatar} alt="Avatar" />
						) : (
							<h1 className={styles.mainInfo__initials}>{getInitials()}</h1>
						)}
					</div>
				</div>
				<Header as="h2" className={styles.mainInfo__fullName}>
					{firstName} {lastName}
				</Header>
				{username && <p className={styles.mainInfo__username}>{username}</p>}
			</div>
			{isCurrentUser && showManager && (
				<Button
					className={styles.managerButton}
					onClick={() => showManager('profile')}
					disabled={!editMode ? false : true}
				>
					Manage your account
				</Button>
			)}
		</div>
	);
};

export default ProfilePicture;
