import React, { useState } from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { PropsExtendedData } from 'containers/ProfilePage';

const ProfilePicture: React.FC<PropsExtendedData> = (props: PropsExtendedData) => {
	const { user, isCurrentUser, showManager } = props;
	const [uploadUrl, setUploadUrl] = useState<ArrayBuffer | string | null>('');
	const [formData, setFormData] = useState(null);
	const uploadPhoto = async (e: any) => {
		setFormData(e.target.files[0]);
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = () => {
				const { result } = reader;
				setUploadUrl(result);
			};
		}
	};
	const getInitials = () => (user && user.firstName && user.lastName ? user.firstName[0] + user.lastName[0] : '');

	return (
		<>
			{user && (
				<div className={styles.container}>
					<div className={styles.mainInfo}>
						<div className={styles.mainInfo__avatarContainer}>
							<div className={styles.mainInfo__borderHelper}>
								{uploadUrl ? (
									<img src={uploadUrl as string} className={styles.mainInfo__avatar} alt="Avatar" />
								) : user.avatar ? (
									<img src={user.avatar} className={styles.mainInfo__avatar} alt="Avatar" />
								) : (
									<h1 className={styles.mainInfo__initials}>{getInitials()}</h1>
								)}
								<Icon name="photo" size="big" className={styles.mainInfo__editBtn} />
								<input
									accept="image/*"
									id="contained-button-file"
									multiple
									type="file"
									onChange={uploadPhoto}
									className={styles.hidden}
								/>
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
