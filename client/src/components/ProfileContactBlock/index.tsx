import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

interface Props {
	email: keyof UserProfileState;
	isCurrentUser: boolean;
}
const ProfileContacntBlock: React.FC<Props> = (props: Props) => {
	const { email, isCurrentUser } = props;
	return (
		<>
			<Header as="h3" className={styles.header}>
				Contact
			</Header>
			{email ? (
				<div className={`${styles.email} ${styles.neverPoint}`}>
					<Icon disabled name="envelope outline" size="large" />
					<p className={styles.infoBlock__content}>{email}</p>
				</div>
			) : isCurrentUser ? (
				<div className={styles.item}>
					<Icon disabled name="envelope outline" size="large" />
					<p>Your location</p>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default ProfileContacntBlock;
