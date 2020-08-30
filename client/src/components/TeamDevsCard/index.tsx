import React, { useState } from 'react';
import { Card, Icon, Button, TextArea, TextAreaProps } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';
import AditionalModal from 'components/TeamAddPeopleModal/aditionalModal';
import { useTranslation } from 'react-i18next';
import { User } from 'containers/LoginPage/logic/state';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

type CardProps = {
	teamOwner: WebApi.Entities.UserProfile;
	currentProfile: User | null;
	description?: string;
	name?: string;
	showAddPeopleModal: () => void;
	confirmDelete: () => void;
	changeMainFields: (arg: { [key: string]: string }) => void;
};

const TeamDevsCard = ({
	currentProfile,
	showAddPeopleModal,
	teamOwner,
	changeMainFields,
	confirmDelete,
	description = '',
	name = '',
}: CardProps) => {
	const authUser = useSelector((rootState: RootState) => rootState.auth.user);

	const [showDelete, setShowDelete] = useState<boolean>(false);
	const [lockEditFields, setEditFields] = useState<boolean>(true);
	const [title, setTitle] = useState<string>(name);
	const [teamDescription, setTeamDescription] = useState<string>(description);
	const { t } = useTranslation();
	const submitEditFields = () => {
		setEditFields(!lockEditFields);
		if (lockEditFields) {
			return;
		}
		if (name === title.trim() && description === teamDescription) {
			return;
		}

		changeMainFields({
			name: title,
			description: teamDescription,
		});
	};

	const abortChhange = () => {
		setTitle(name);
		setTeamDescription(description);
		setEditFields(true);
	};

	return (
		<Card>
			<Card.Content className={styles.cardHeader}>
				<Icon name="group" size="large" />
				<input
					disabled={lockEditFields}
					value={title}
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					className={lockEditFields ? styles.inputFocus : `${styles.inputFocus} ${styles.inputBorders}`}
				/>
			</Card.Content>
			<Card.Content>
				<TextArea
					as="textarea"
					placeholder={t('add_some_description')}
					disabled={lockEditFields}
					onChange={(event: TextAreaProps) => setTeamDescription(event.target.value)}
					value={teamDescription}
					rows={3}
					className={lockEditFields ? styles.inputArea : `${styles.inputArea} ${styles.inputBorders}`}
				/>
			</Card.Content>
			{teamOwner && teamOwner.id === authUser?.id && (
				<>
					<Card.Content className={styles.editFieldBtn}>
						<Button compact fluid={lockEditFields} color="blue" onClick={() => submitEditFields()}>
							{t(lockEditFields ? 'edit_fields' : 'save_changes')}
						</Button>
						{!lockEditFields && (
							<Button compact basic className={styles.editBtn} onClick={abortChhange}>
								{t('cancel')}
							</Button>
						)}
					</Card.Content>
					<Card.Content extra>
						<Button.Group fluid>
							<Button
								basic
								compact
								className={`${styles.margin1} ${styles.mediaBtns} ${styles.editBtn}`}
								onClick={showAddPeopleModal}
								disabled={currentProfile?.id !== teamOwner?.id}
							>
								<span className={styles.editBtnValue}>{t('add_people')}</span>
							</Button>
							<Button compact basic className={styles.deleteBtn} onClick={() => setShowDelete(true)}>
								<span className={styles.deleteBtnValue}>{t('delete_team')}</span>
							</Button>
						</Button.Group>
					</Card.Content>
				</>
			)}

			{showDelete && <AditionalModal confirmDelete={confirmDelete} setShowDelete={setShowDelete} />}
		</Card>
	);
};

export default TeamDevsCard;
