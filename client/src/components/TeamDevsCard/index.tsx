import React, { useState } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';
import AditionalModal from 'components/TeamAddPeopleModal/aditionalModal';

type CardProps = {
	description: string;
	name: string;
	showAddPeopleModal: any;
	setShowDeleteTeamModal: any;
};

const TeamDevsCard = ({ description, name, showAddPeopleModal, setShowDeleteTeamModal }: CardProps) => {
	const [showDelete, setShowDelete] = useState<boolean>(false);
	return (
		<Card>
			<Card.Content header={name} />
			<Card.Meta>
				<span className={styles.meta_header}>
					<Icon name="eye" /> Open team
				</span>
			</Card.Meta>
			<Card.Content description={description} />
			<Card.Content extra>
				<Button.Group fluid>
					<Button compact className={styles.margin_1} onClick={showAddPeopleModal}>
						Add people
					</Button>
					<Button compact icon="ellipsis horizontal" onClick={() => setShowDelete(true)} />
				</Button.Group>
			</Card.Content>
			{showDelete && <AditionalModal setShowDelete={setShowDelete} />}
		</Card>
	);
};

export default TeamDevsCard;
