import React from 'react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';

type Props = {
	users: WebApi.Entities.UserProfile[];
};

const ChosenPeople = ({ users }: Props) => {
	return (
		<div className={styles.users_wrapper}>
			{users.map((el: WebApi.Entities.UserProfile) => (
				<div key={el.id} className={styles.user_block}>
					<div className={styles.main_info}>
						<span className={styles.fullname}> {`${el.firstName} ${el.lastName}`} </span>
						<span className={styles.email}>{el.email}</span>
					</div>
					<div className={styles.user_avatar}>
						<Avatar fullName={`${el.firstName} ${el.lastName}`} imgSrc={el?.avatar} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ChosenPeople;
