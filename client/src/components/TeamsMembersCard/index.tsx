import ModalViewProfile from 'components/common/ModalViewProfile';
import React, { useState } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RemoveUserModal from './removeUserModal';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

type Props = {
	teammates?: User[];
	title: string;
	teamOwner: WebApi.Entities.UserProfile;
	removeUserFromTeam: (arg: string) => void;
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

const TeamsMembersCard = ({ title, teamOwner, removeUserFromTeam, teammates = [] }: Props) => {
	const authUser = useSelector((rootState: RootState) => rootState.auth.user);

	const [modal, setModal] = useState<boolean>(false);
	const [removeUserModal, setRemoveUserModal] = useState<boolean>(false);
	const [viewUser, setViewUser] = useState<User | undefined>();
	const [userToRemove, setUserToRemove] = useState<User>({
		id: '',
		firstName: '',
		lastName: '',
		avatar: '',
	});
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

	const { t } = useTranslation();
	const fullUserName = (fn: string, ln: string): string => `${fn} ${ln}`;
	const onDeleteUserClick = (user: User) => {
		setUserToRemove(user);
		setRemoveUserModal(true);
	};

	const removeUser = (id: string) => {
		removeUserFromTeam(id);
		setViewUser(undefined);
		setRemoveUserModal(false);
	};

	return (
		<Card>
			<Card.Content header={t(title)} />
			<Card.Meta>
				<span className={styles.meta_header}>
					{teammates.length > 0 && title === 'members' && ` ${teammates.length}  ${t('members')}`}
				</span>
			</Card.Meta>
			{teammates.length > 0 ? (
				teammates.map((el) => (
					<Card.Content key={el.id}>
						<div
							className={styles.card_body}
							onMouseEnter={() => onHover(el)}
							onMouseLeave={(e) => hideModal(e)}
						>
							<div className={styles.icon}>
								<Link to={`/profile/${el.id}`}>
									<Avatar
										key={el.id}
										fullName={fullUserName(el.firstName, el.lastName)}
										imgSrc={el.avatar}
									/>
								</Link>
							</div>
							<div className={styles.user_info}>
								<p> {fullUserName(el.firstName, el.lastName)}</p>
								<p className={styles.metainfo}>{el.jobTitle}</p>
								{teamOwner &&
									authUser?.id === teamOwner.id &&
									viewUser?.id === el.id &&
									viewUser.id !== teamOwner.id && (
										<Icon
											name="delete"
											onClick={() => onDeleteUserClick(el)}
											className={styles.user_delete_btn}
										/>
									)}
							</div>
							{removeUserModal && (
								<RemoveUserModal
									user={userToRemove}
									confirm={removeUser}
									setShowDelete={setRemoveUserModal}
								/>
							)}
							{modal && viewUser?.id === el.id && (
								<ModalViewProfile key={el.id} user={viewUser} onClose={hideModal} />
							)}
						</div>
					</Card.Content>
				))
			) : (
				<Card.Content className={styles.info_message}>{t('you_are_the_first')}</Card.Content>
			)}
		</Card>
	);
};

export default TeamsMembersCard;
