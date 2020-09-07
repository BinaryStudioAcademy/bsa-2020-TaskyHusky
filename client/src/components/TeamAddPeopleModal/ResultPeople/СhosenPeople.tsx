import React from 'react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';

type Props = {
	users: WebApi.Entities.UserProfile[];
};

const ChosenPeople = ({ users }: Props) => {
	return (
		<div className={styles.usersWrapper}>
			{users.map((el: WebApi.Entities.UserProfile) => (
				<div key={el.id} className={styles.userBlock}>
					<div className={styles.mainInfo}>
						<span className={styles.fullname}> {`${el.firstName} ${el.lastName}`} </span>
						<span className={styles.email}>{el.email}</span>
					</div>
					<div className={styles.userAvatar}>
						<Avatar fullName={`${el.firstName} ${el.lastName}`} imgSrc={el?.avatar} color={el.color} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ChosenPeople;
