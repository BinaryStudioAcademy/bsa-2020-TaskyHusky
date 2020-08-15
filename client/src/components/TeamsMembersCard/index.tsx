import ModalViewProfile from 'components/common/ModalViewProfile';
import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getBgColor } from './helper';

type Props = {
	teammates?: User[];
};
export interface User {
	id: string;
	email?: string;
	firstName: string;
	avatar: string;
	location?: string;
	department?: string;
	jobTitle?: string;
}

const TeamsMembersCard = ({ teammates }: Props) => {
	const [bgColor, setBgColor] = useState({});
	const [modal, setModal] = useState<boolean>(false);
	const [viewUser, setViewUser] = useState<User | undefined>();
	const onHover = (user: User) => {
		setBgColor(getBgColor());
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
			firstName: 'Vladimir Barkalov',
			jobTitle: 'Java developer',
			location: '12:00 AM',
			email: 'vladimir@i.ua',
			department: 'Kyiv, UA',
		},
		{
			id: '102',
			avatar: '',
			firstName: 'Yaroslav Pryhoda',
			jobTitle: 'Web developer',
			location: '9:00 AM',
			email: 'someemail@i.ua',
			department: 'London, UK',
		},
	];
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content header={t('members')} />
			<Card.Meta>
				<span className={styles.meta_header}>
					{teammates ? `${teammates?.length}  ${t('members')}` : t('no team yet')}
				</span>
			</Card.Meta>
			{teammates?.map((el) => {
				return (
					<Card.Content key={el.id}>
						<div
							className={styles.card_body}
							onMouseEnter={() => onHover(el)}
							onMouseLeave={(e) => hideModal(e)}
						>
							<div className={styles.icon}>
								<Link to={`/profile/${el.id}`}>
									<Avatar fullName={el.firstName} imgSrc={el.avatar} />
								</Link>
							</div>
							<div className={styles.user_info}>
								<p> {el.firstName}</p>
								<p className={styles.metainfo}>{el.jobTitle}</p>
							</div>
							{modal && viewUser?.id === el.id && (
								<ModalViewProfile user={viewUser} onClose={hideModal} color={bgColor} />
							)}
						</div>
					</Card.Content>
				);
			})}
		</Card>
	);
};

export default TeamsMembersCard;
