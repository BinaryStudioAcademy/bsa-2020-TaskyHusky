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
	const [title, setTitle] = useState<string>(name);
	const [teamDescription, setTeamDescription] = useState<string>(description);
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content className={styles.card_header}>
				<Icon name="group" size="large" />
				<input
					value={title}
					onBlur={() => name !== title.trim() && changeMainFields({ name: title })}
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					className={styles.input_focus}
				/>
			</Card.Content>
			<Card.Content>
				<textarea
					onBlur={() =>
						description !== teamDescription.trim() && changeMainFields({ description: teamDescription })
					}
					onChange={(e) => setTeamDescription(e.target.value)}
					defaultValue={teamDescription}
					rows={4}
					className={styles.input_area}
				></textarea>
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
