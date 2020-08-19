import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface Props {
	isOpened: boolean;
	setIsOpened: (param: boolean) => void;
	confirmAction: () => void;
	header: string;
	content: string;
}

export const ConfirmModal = ({ isOpened, setIsOpened, confirmAction, header, content }: Props) => (
	<Modal size={'mini'} open={isOpened} onClose={() => setIsOpened(false)}>
		<Modal.Header>{header}</Modal.Header>
		<Modal.Content>
			<p>{content}</p>
		</Modal.Content>
		<Modal.Actions>
			<Button negative onClick={() => setIsOpened(false)}>
				No
			</Button>
			<Button positive onClick={confirmAction}>
				Yes
			</Button>
		</Modal.Actions>
	</Modal>
);
