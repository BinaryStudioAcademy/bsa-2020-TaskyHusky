import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const ModalViewProfile = ({ user }: any) => {
	return (
		<div className={styles.block_wrapper}>
			<div className={styles.header}>
				<div className={styles.left_margin}></div>
				<div className={styles.name}>
					<span>{user.name}</span>
					<span>{user.position}</span>
				</div>
			</div>
			<div className={styles.avatar}>
				<Avatar fullName={user.name} imgSrc={user.avatar} />
			</div>
			<div className={styles.main_info}>
				<div className={styles.left_margin}></div>
				<div className={styles.details}>
					<span>{user.email}</span>
					<span>{user.timezone}</span>
					<span>{user.location}</span>
					<Link to={`/profile/${user.id}`}>
						<Button primary className={styles.view}>
							View profile
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ModalViewProfile;
