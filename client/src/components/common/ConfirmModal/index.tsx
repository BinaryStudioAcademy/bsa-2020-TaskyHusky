import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface Props {
	isOpened: boolean;
	setIsOpened: (param: boolean) => void;
	confirmAction: (cb: any) => void;
	header?: string;
	content?: string;
}

const ConfirmModal = ({ isOpened, setIsOpened, confirmAction, header, content }: Props) => (
	<Modal size="mini" dimmer="inverted" open={isOpened} onClose={() => setIsOpened(false)}>
		<Modal.Header>{header}</Modal.Header>
		<Modal.Content>
			<p>{content}</p>
		</Modal.Content>
		<Modal.Actions>
			<Button className="cancelBtn" onClick={() => setIsOpened(false)}>
				No
			</Button>
			<Button className="primaryBtn" onClick={confirmAction}>
				Yes
			</Button>
		</Modal.Actions>
	</Modal>
);

export default ConfirmModal;
