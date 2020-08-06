import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

const ProfilePicture = ({
	user: { avatar, username, fullName },
	isCurrentUser,
}: {
	user: { avatar?: string; username?: string; fullName?: string };
	isCurrentUser: boolean;
}) => {
	const getInitials = () =>
		fullName
			? fullName
					.split(' ')
					.map((item) => item[0])
					.join('')
			: '';

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
					{fullName}
				</Header>
				{username && <p className={styles.mainInfo__username}>{username}</p>}
			</div>
			{isCurrentUser && <Button className={styles.managerButton}>Manage your account</Button>}
		</div>
	);
};

export default ProfilePicture;
