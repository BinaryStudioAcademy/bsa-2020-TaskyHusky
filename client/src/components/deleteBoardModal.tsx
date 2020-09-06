import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import * as actions from '../containers/Boards/logic/actions';
import { useTranslation } from 'react-i18next';

interface Props {
	board: WebApi.Board.IBoardModel;
	onClose: () => void;
}

const DeleteBoardModal: React.FC<Props> = (props) => {
	const { board, onClose } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleDelete = () => {
		dispatch(actions.deleteBoard({ id: board.id }));
		onClose();
	};

	return (
		<Modal onClose={() => onClose()} open={true} size="tiny">
			<Modal.Header>{`${t('delete')} ${board.name}`}</Modal.Header>
			<Modal.Content>{t('delete_board_modal_text')}</Modal.Content>
			<Modal.Actions>
				<Button className="contentBtn" onClick={handleDelete}>
					{t('delete')}
				</Button>
				<Button className="cancelBtn" onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteBoardModal;
