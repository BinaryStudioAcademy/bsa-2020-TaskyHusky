import React, { useState } from 'react';
import { Button, TextArea, TextAreaProps, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import AditionalModal from 'components/TeamAddPeopleModal/aditionalModal';
import { useTranslation } from 'react-i18next';
import { User } from 'containers/LoginPage/logic/state';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { validTeamName } from 'helpers/validationRules';

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
	const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
	const [teamDescription, setTeamDescription] = useState<string>(description);
	const { t } = useTranslation();
	const submitEditFields = () => {
		setEditFields(!lockEditFields);
		setIsTitleValid(validTeamName(title.trim()));

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
		<div className={styles.card}>
			<Popup
				open={!lockEditFields && !isTitleValid}
				content={t('min4_max40_length_message')}
				position="bottom left"
				trigger={
					<input
						disabled={lockEditFields}
						value={title}
						type="text"
						onChange={(e) => {
							setTitle(e.target.value.trim());
							setIsTitleValid(validTeamName(e.target.value.trim()));
						}}
						className={
							lockEditFields ? styles.inputFocus : `${styles.inputFocus} ${styles.inputNoneBorders}`
						}
					/>
				}
			/>
			<TextArea
				as="textarea"
				placeholder={t('add_some_description')}
				disabled={lockEditFields}
				onChange={(event: TextAreaProps) => setTeamDescription(event.target.value)}
				value={teamDescription ?? ''}
				rows={3}
				className={lockEditFields ? styles.inputArea : `${styles.inputArea} ${styles.inputBorders}`}
			/>
			{teamOwner && teamOwner.id === authUser?.id && (
				<>
					<div className={styles.btnContainer}>
						<Button
							className={styles.editFieldBtn}
							onClick={() => submitEditFields()}
							disabled={!lockEditFields && !isTitleValid}
						>
							{t(lockEditFields ? 'edit_fields' : 'save_changes')}
						</Button>
						{!lockEditFields && (
							<Button className={styles.cancelBtn} onClick={abortChhange}>
								{t('cancel')}
							</Button>
						)}
					</div>
					<div className={styles.btnContainer}>
						<Button
							className={styles.addPeople}
							onClick={showAddPeopleModal}
							disabled={currentProfile?.id !== teamOwner?.id}
						>
							{t('add_people')}
						</Button>
						<Button className={styles.deleteBtn} onClick={() => setShowDelete(true)}>
							{t('delete_team')}
						</Button>
					</div>
				</>
			)}

			{showDelete && <AditionalModal confirmDelete={confirmDelete} setShowDelete={setShowDelete} />}
		</div>
	);
};

export default TeamDevsCard;
