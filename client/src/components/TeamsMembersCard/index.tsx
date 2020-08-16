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
	title: string;
};
export interface User {
	id: string;
	email?: string;
	firstName: string;
	lastName: string;
	avatar: string;
	location?: string;
	department?: string;
	jobTitle?: string;
}

const TeamsMembersCard = ({ teammates, title }: Props) => {
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
	const { t } = useTranslation();
	const fullUserName = (fn: string, ln: string): string => `${fn} ${ln}`;

	return (
		<Card>
			<Card.Content header={t(title)} />
			<Card.Meta>
				<span className={styles.meta_header}>
					{title === 'Members' && ` ${teammates?.length}  ${t('members')}`}
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
									<Avatar fullName={fullUserName(el.firstName, el.lastName)} imgSrc={el.avatar} />
								</Link>
							</div>
							<div className={styles.user_info}>
								<p> {fullUserName(el.firstName, el.lastName)}</p>
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
