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
		<Modal onClose={onClose} open={true} size="tiny">
			<Modal.Header>{t('delete_user_qstn')}</Modal.Header>
			<Modal.Content>{t('delete_user_text')}</Modal.Content>
			<Modal.Actions>
				<Button className="contentBtn" onClick={submitForm}>
					{t('delete_btn')}
				</Button>
				<Button className="cancelBtn" onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteUserModal;
