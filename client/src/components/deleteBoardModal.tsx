import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import * as actions from '../containers/Boards/logic/actions';

interface Props {
	board: WebApi.Board.IBoardModel;
	onClose: () => void;
}

const DeleteBoardModal: React.FC<Props> = (props) => {
	const { board, onClose } = props;
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(actions.deleteBoard({ id: board.id }));
		onClose();
	};

	return (
		<Modal closeIcon onClose={() => onClose()} open={true} size={'tiny'} dimmer="inverted">
			<Modal.Header>{`Delete ${board.name}`}</Modal.Header>
			<Modal.Content>
				{"Deleting A1 board doesn't affect the issues on the board. And, it won't complete or delete any " +
					'active sprints.'}
			</Modal.Content>
			<Modal.Actions>
				<Button negative onClick={handleDelete}>
					Delete
				</Button>
				<Button color="blue" basic onClick={onClose}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteBoardModal;
