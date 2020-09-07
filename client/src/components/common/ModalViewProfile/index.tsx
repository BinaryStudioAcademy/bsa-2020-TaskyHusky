import React from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Spinner from 'components/common/Spinner';
import toolbox from 'icons/profile/toolbox.svg';
import reorder from 'icons/profile/reorder.svg';
import geo from 'icons/profile/geo.svg';

type UserModel = {
	id: string;
	email?: string;
	firstName: string;
	lastName: string;
	avatar: string;
	location?: string;
	department?: string;
	jobTitle?: string;
	color?: string;
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
								<span className={styles.fullName}>{`${user.firstName} ${user.lastName}`}</span>
								<span className={styles.title}>{user.jobTitle}</span>
							</div>
						</div>
						<div className={styles.main_info}>
							<div className={styles.avatar}>
								<Link to={`/profile/${user.id}`}>
									<Avatar
										fullName={`${user.firstName} ${user.lastName}`}
										imgSrc={user.avatar}
										color={user.color}
									/>
								</Link>
							</div>
							<div className={styles.left_margin}></div>
							<div className={styles.details}>
								<span className={styles.field}>
									<img src={toolbox} alt="icon" className={styles.iconEmail} />
									<span className={styles.user_field}>{user.email}</span>
								</span>
								{user.location && (
									<span className={styles.field}>
										<img src={reorder} alt="icon" className={styles.iconDep} />
										<span className={styles.user_field}>{user.location}</span>
									</span>
								)}
								{user.department && (
									<span className={styles.field}>
										<img src={geo} alt="icon" className={styles.iconGeo} />
										<span className={styles.user_field}>{user.department}</span>
									</span>
								)}
								<Link to={`/profile/${user.id}`}>
									<Button className={styles.button}>View profile</Button>
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
