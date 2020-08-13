import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = {
	setShowDelete: (arg: boolean) => void;
};

const AditionalModal = ({ setShowDelete }: Props) => {
	return (
		<Modal onClose={() => setShowDelete(false)} open size="tiny" dimmer="blurring">
			<Modal.Header>
				<Icon name="warning circle" size="large" color="red" />
				<span className={styles.title_modal}>You are going to delete this team</span>
			</Modal.Header>
			<Modal.Content>
				<p className={styles.text_modal}>
					Deleting the team will destroy all information related to it. The name of the team, participants,
					description, profile photo and links to attracted materials will be deleted.
				</p>
				<p className={styles.text_modal}>Deleting the team cannot be prevented. Are you sure to continue?</p>
			</Modal.Content>
			<Modal.Actions>
				<Button content="Cancel" onClick={() => setShowDelete(false)} />
				<Button icon="check" content="I'm sure" color="red" onClick={() => console.log('deleted')} />
			</Modal.Actions>
		</Modal>
	);
};

export default AditionalModal;
