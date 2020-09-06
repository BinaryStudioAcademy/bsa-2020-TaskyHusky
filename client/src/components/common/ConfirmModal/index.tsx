import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpened: boolean;
	setIsOpened: (param: boolean) => void;
	confirmAction: (cb: any) => void;
	header?: string;
	content?: string;
}

const ConfirmModal = ({ isOpened, setIsOpened, confirmAction, header, content }: Props) => {
	const { t } = useTranslation();
	return (
		<Modal size="mini" open={isOpened} onClose={() => setIsOpened(false)}>
			<Modal.Header>{header}</Modal.Header>
			<Modal.Content>
				<p>{content}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button className="cancelBtn" onClick={() => setIsOpened(false)}>
					{t('no')}
				</Button>
				<Button onClick={confirmAction} className={'primaryBtn'}>
					{t('yes')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ConfirmModal;
