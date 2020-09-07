import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deleteIssue } from 'pages/IssuePage/logic/actions';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
interface Props {
	currentIssueId: string;
	onDelete?: () => void;
	onClose?: () => void;
	onOpen?: () => void;
	open?: boolean;
	children?: JSX.Element;
	noTrigger?: boolean;
}

const DeleteIssueModal: React.FC<Props> = ({
	open,
	onOpen = () => {},
	onClose = () => {},
	currentIssueId,
	onDelete = () => {},
	children,
	noTrigger,
}) => {
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
		<Modal
			centered={false}
			open={open}
			onClose={onClose}
			onOpen={onOpen}
			trigger={noTrigger ? undefined : children ?? <span className={styles.trigger}>{t('delete')}</span>}
		>
			<Modal.Header className="standartHeader">{t('delete_issue')}</Modal.Header>
			<Modal.Content>
				<Modal.Description className="textData">{t('permanently_delete')}</Modal.Description>
				<br />
				<Modal.Description>{t('sure_to_delete')}</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button className="contentBtn" onClick={handleDelete}>
					{t('delete')}
				</Button>
				<Button onClick={onClose} className="cancelBtn">
					{t('close')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteIssueModal;
