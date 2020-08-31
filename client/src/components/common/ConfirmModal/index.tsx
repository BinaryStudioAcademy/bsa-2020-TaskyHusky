import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	isOpened: boolean;
	setIsOpened: (param: boolean) => void;
	confirmAction: (cb: any) => void;
	header?: string;
	content?: string;
}

const ConfirmModal = ({ isOpened, setIsOpened, confirmAction, header, content }: Props) => (
	<Modal size={'mini'} dimmer="inverted" open={isOpened} onClose={() => setIsOpened(false)}>
		<Modal.Header>{header}</Modal.Header>
		<Modal.Content>
			<p>{content}</p>
		</Modal.Content>
		<Modal.Actions>
			<Button onClick={() => setIsOpened(false)}>No</Button>
			<Button primary onClick={confirmAction} className={styles.primary__button}>
				Yes
			</Button>
		</Modal.Actions>
	</Modal>
);

export default ConfirmModal;
