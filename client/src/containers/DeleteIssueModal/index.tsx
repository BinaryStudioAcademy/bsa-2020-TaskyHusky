import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deleteIssue } from 'pages/CreateIssue/logic/actions';
import { useTranslation } from 'react-i18next';

interface Props {
	currentIssueId: string;
	onDelete: () => void;
	onClose: () => void;
	onOpen: () => void;
	open: boolean;
}

const DeleteIssueModal: React.FC<Props> = ({ open, onOpen, onClose, currentIssueId, onDelete }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleDelete = async () => {
		dispatch(
			deleteIssue({
				id: currentIssueId,
			}),
		);

		onClose();
		onDelete();
	};

	return (
		<Modal centered={false} open={open} onClose={onClose} onOpen={onOpen} trigger={<span>{t('delete')}</span>}>
			<Modal.Header>Delete issue?</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					You are about to permanently delete this issue, its comments and attachments, and all of its data.
				</Modal.Description>
				<br />
				<Modal.Description>If you are not sure, you can resolve or close this issue instead.</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="red" onClick={handleDelete}>
					Delete
				</Button>
				<Button onClick={onClose}>Close</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteIssueModal;
