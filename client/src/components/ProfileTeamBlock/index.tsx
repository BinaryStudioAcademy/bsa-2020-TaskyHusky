import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { PropsUserData } from 'containers/ProfilePage';

const ProfileTeamBlock: React.FC<PropsUserData> = (props: PropsUserData) => {
	const { user, isCurrentUser, mockData } = props;
	return (
		<div>
			<Header as="h3" className={styles.header}>
				Teams
			</Header>
			{mockData.teams.map((item: any) => (
				<div key={item.id} className={styles.item}>
					<div className={styles.groupIcon}>
						<Icon disabled name="group" size="small" />
					</div>
					<div>
						<p className={styles.content}>{item.name}</p>
						<p className={styles.content__secondary}>
							{item.members}
							{item.members === 1 ? ' member' : ' members'}
						</p>
					</div>
				</div>
			))}
			{isCurrentUser && (
				<div className={styles.item}>
					<div className={styles.groupIcon__secondary}>
						<Icon disabled name="group" size="small" />
					</div>
					<p className={styles.content}>Start a team...</p>
				</div>
			)}
		</div>
	);
};

export default ProfileTeamBlock;
