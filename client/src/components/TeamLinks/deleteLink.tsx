import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';

type Props = {
	onClose: () => void;
	link: CurrentLink;
	onDelete: (arg: CurrentLink) => void;
};

const DeleteLink = ({ onClose, link, onDelete }: Props) => {
	return (
		<Modal onClose={onClose} open size="tiny">
			<Modal.Header>Delete this link</Modal.Header>
			<Modal.Content>
				<p className={styles.link_description}>
					Link to <span className={styles.link_title}>{link.name}</span> will be deleted from team links
					section
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button content="Accept" primary labelPosition="left" icon="checkmark" onClick={() => onDelete(link)} />
				<Button color="grey" onClick={onClose}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteLink;
