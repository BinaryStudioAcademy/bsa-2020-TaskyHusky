import ModalViewProfile from 'components/common/ModalViewProfile';
import React, { useState } from 'react';
import { Card, Image } from 'semantic-ui-react';
import styles from './styles.module.scss';
interface User {
	id: string;
	avatar?: string;
	name: string;
	position?: string;
	timezone?: string;
	email: string;
	location?: string;
}
const TeamsMembersCard = () => {
	const [modal, setModal] = useState(false);
	const [viewUser, setViewUser] = useState<User>();
	const onHover = (user: User) => {
		setViewUser(user);
		setModal(true);
	};
	const data = [
		{
			id: '101',
			avatar:
				'https://i7.pngflow.com/pngimage/779/60/png-computer-icons-login-avatar-avatar-heroes-silhouette-user-symbol-clipart.png',
			name: 'Vladimir Barkalov',
			position: 'Java developer',
			timezone: '12:00 AM',
			email: 'vladimir@i.ua',
			location: 'Kyiv, UA',
		},
		{
			id: '102',
			avatar: 'https://images.clipartlogo.com/files/istock/previews/9859/98596917-worker-avatar-icon.jpg',
			name: 'Yaroslav Pryhoda',
			position: 'Web developer',
			timezone: '9:00 AM',
			email: 'someemail@i.ua',
			location: 'London, UK',
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
						<div className={styles.card_body} onMouseEnter={() => onHover(el)}>
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
			{modal && <ModalViewProfile user={viewUser} />}
		</Card>
	);
};

export default TeamsMembersCard;
