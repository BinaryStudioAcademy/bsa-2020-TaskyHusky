import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	onClose: () => void;
	deleteUser: () => void;
}

const DeleteUserModal: React.FC<Props> = (props) => {
	const { deleteUser, onClose } = props;
	const { t } = useTranslation();

	const submitForm = () => {
		deleteUser();
		onClose();
	};

	return (
		<Modal onClose={onClose} open={true} size="tiny" dimmer="inverted">
			<Modal.Header>{t('delete_user_qstn')}</Modal.Header>
			<Modal.Content>{t('delete_user_text')}</Modal.Content>
			<Modal.Actions>
				<Button onClick={submitForm}>{t('delete_btn')}</Button>
				<Button primary onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteUserModal;
