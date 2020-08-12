import ModalViewProfile from 'components/common/ModalViewProfile';
import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
	const [viewUser, setViewUser] = useState<User | undefined>();
	const onHover = (user: User) => {
		setViewUser(user);
		setModal(true);
	};
	const hideModal = (e: React.BaseSyntheticEvent) => {
		if (!e.target.classList.contains('card_body') && !e.target.classList.contains('block_wrapper')) {
			setModal(false);
			setViewUser(undefined);
		}
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
			avatar: '',
			name: 'Yaroslav Pryhoda',
			position: 'Web developer',
			timezone: '9:00 AM',
			email: 'someemail@i.ua',
			location: 'London, UK',
		},
	];
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content header={t('members')} />
			<Card.Meta>
				<span className={styles.meta_header}>
					{' '}
					{data.length} {t('members')}
				</span>
			</Card.Meta>
			{data.map((el) => {
				return (
					<Card.Content key={el.id}>
						<div
							className={styles.card_body}
							onMouseEnter={() => onHover(el)}
							onMouseLeave={(e) => hideModal(e)}
						>
							<div className={styles.icon}>
								<Link to={`/people/${el.id}`}>
									<Avatar fullName={el.name} imgSrc={el.avatar} />
								</Link>
							</div>
							<div className={styles.user_info}>
								<p> {el.name}</p>
								<p className={styles.metainfo}>{el.position}</p>
							</div>
							{modal && viewUser?.id === el.id && (
								<ModalViewProfile user={viewUser} onClose={hideModal} />
							)}
						</div>
					</Card.Content>
				);
			})}
		</Card>
	);
};

export default TeamsMembersCard;
