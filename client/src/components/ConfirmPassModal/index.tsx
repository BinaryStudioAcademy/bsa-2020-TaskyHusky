import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	onClose: () => void;
	updatePassword: () => void;
}

const ConfirmPassModal: React.FC<Props> = (props: Props) => {
	const { updatePassword, onClose } = props;
	const { t } = useTranslation();

	const submitForm = () => {
		updatePassword();
		onClose();
	};

	return (
		<Modal onClose={() => onClose()} open={true} size="tiny">
			<Modal.Header>{t('save_not_secure')}</Modal.Header>
			<Modal.Content>{t('save_not_secure_text')}</Modal.Content>
			<Modal.Actions>
				<Button className="primaryBtn" onClick={submitForm}>
					{t('save_changes')}
				</Button>
				<Button className="cancelBtn" color="blue" onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ConfirmPassModal;
