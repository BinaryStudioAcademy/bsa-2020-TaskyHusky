import React, { useState } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';
import AditionalModal from 'components/TeamAddPeopleModal/aditionalModal';
import { useTranslation } from 'react-i18next';

type CardProps = {
	description?: string;
	name?: string;
	showAddPeopleModal: () => void;
	changeMainFields: (arg: { [key: string]: string }) => void;
};

const TeamDevsCard = ({ changeMainFields, description = '', name = '', showAddPeopleModal }: CardProps) => {
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
		if (name === title.trim() && description === teamDescription.trim()) {
			return;
		}
		changeMainFields({
			name: title,
			description: teamDescription,
		});
	};
	return (
		<Card>
			<Card.Content className={styles.card_header}>
				<Icon name="group" size="large" />
				<input
					disabled={lockEditFields}
					value={title}
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					className={lockEditFields ? styles.input_focus : `${styles.input_focus} ${styles.input_borders}`}
				/>
			</Card.Content>
			<Card.Content>
				<textarea
					disabled={lockEditFields}
					onChange={(e) => setTeamDescription(e.target.value)}
					defaultValue={teamDescription}
					rows={4}
					className={lockEditFields ? styles.input_area : `${styles.input_area} ${styles.input_borders}`}
				></textarea>
			</Card.Content>
			<Card.Content className={styles.edit_field_btn}>
				<Button compact color="blue" fluid onClick={() => submitEditFields()}>
					{t(lockEditFields ? 'Edit fields' : 'Save changes')}
				</Button>
			</Card.Content>
			<Card.Content extra>
				<Button.Group fluid>
					<Button compact className={styles.margin_1} onClick={showAddPeopleModal}>
						{t('Add people')}
					</Button>
					<Button compact color="red" onClick={() => setShowDelete(true)}>
						{t('Delete team')}
					</Button>
				</Button.Group>
			</Card.Content>
			{showDelete && <AditionalModal setShowDelete={setShowDelete} />}
		</Card>
	);
};

export default TeamDevsCard;
