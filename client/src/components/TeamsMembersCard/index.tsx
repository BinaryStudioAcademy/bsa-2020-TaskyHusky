import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';

const TeamsMembersCard = () => {
	const data = [
		{
			id: 101,
			avatar:
				'https://i7.pngflow.com/pngimage/779/60/png-computer-icons-login-avatar-avatar-heroes-silhouette-user-symbol-clipart.png',
			name: 'Vladimir Barkalov',
			position: 'Java developer',
		},
		{
			id: 102,
			avatar: 'https://images.clipartlogo.com/files/istock/previews/9859/98596917-worker-avatar-icon.jpg',
			name: 'Yaroslav Pryhoda',
			position: 'Web developer',
		},
	];
	return (
		<Card>
			<Card.Content header="Members" />
			<Card.Meta>
				<span className={styles.meta_header}> {data.length} members</span>
			</Card.Meta>
			{data.map((el) => {
				return (
					<Card.Content key={el.id}>
						<div className={styles.card_body}>
							<div className={styles.icon}>
								<Image src={el.avatar} centered circular />
							</div>
							<div className={styles.user_info}>
								<p> {el.name}</p>
								<p className={styles.metainfo}>{el.position}</p>
							</div>
						</div>
					</Card.Content>
				);
			})}
		</Card>
	);
};

export default TeamsMembersCard;
