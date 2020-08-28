import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Spinner from 'components/common/Spinner';

type UserModel = {
	id: string;
	email?: string;
	firstName: string;
	lastName: string;
	avatar: string;
	location?: string;
	department?: string;
	jobTitle?: string;
};

type Props = {
	user: UserModel;
	onClose: (arg: React.BaseSyntheticEvent) => void;
};

const ModalViewProfile = ({ user, onClose }: Props) => {
	const color = useSelector((rootStore: RootState) => rootStore.team.team.color);
	return (
		<>
			<div className={styles.block_wrapper} onMouseLeave={(e) => onClose(e)}>
				{!user.id ? (
					<Spinner />
				) : (
					<>
						<div className={styles.header} style={{ backgroundColor: color }}>
							<div className={styles.left_margin}></div>
							<div className={styles.name}>
								<span>{`${user.firstName} ${user.lastName}`}</span>
								<span>{user.jobTitle}</span>
							</div>
						</div>
						<div className={styles.avatar}>
							<Link to={`/profile/${user.id}`}>
								<Avatar fullName={`${user.firstName} ${user.lastName}`} imgSrc={user.avatar} />
							</Link>
						</div>
						<div className={styles.main_info}>
							<div className={styles.left_margin}></div>
							<div className={styles.details}>
								<span>
									<Icon name="at" size="small" color="grey" />
									{user.email}
								</span>
								{user.location && (
									<span>
										<Icon name="map signs" size="small" color="grey" />
										{user.location}
									</span>
								)}
								{user.department && (
									<span>
										<Icon name="building" size="small" color="grey" />
										{user.department}
									</span>
								)}
								<Link to={`/profile/${user.id}`}>
									<Button primary className={styles.view}>
										View profile
									</Button>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ModalViewProfile;
