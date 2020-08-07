import React from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import styles from './styles.module.scss';
type Props = {
	onClose: any;
};

const TeamAddPeopleModal = ({ onClose }: Props) => {
	return (
		<Modal onClose={() => onClose(false)} open size="small">
			<Modal.Header>Add teammates</Modal.Header>
			<Modal.Content>
				<Input icon="users" iconPosition="left" placeholder="Type username" size="large" fluid />
				<p className={styles.description_p}>No more than 10 people can be invited at the same time.</p>
			</Modal.Content>
			<Modal.Actions>
				<Button content="Accept" primary labelPosition="left" icon="checkmark" onClick={() => onClose(false)} />
				<Button color="grey" onClick={() => onClose(false)}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default TeamAddPeopleModal;
