import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	onClose: () => void;
	updatePassword: () => void;
}

const ConfirmPassModal: React.FC<Props> = (props) => {
	const { updatePassword, onClose } = props;
	const { t } = useTranslation();

	const submitForm = () => {
		updatePassword();
		onClose();
	};

	return (
		<Modal closeIcon onClose={() => onClose()} open={true} size={'tiny'} dimmer="inverted">
			<Modal.Header>{t('save_not_secure')}</Modal.Header>
			<Modal.Content>{t('save_not_secure_text')}</Modal.Content>
			<Modal.Actions>
				<Button primary onClick={submitForm}>
					{t('save_changes')}
				</Button>
				<Button color="blue" basic onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ConfirmPassModal;
