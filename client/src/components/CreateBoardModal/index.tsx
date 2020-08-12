import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { boardTypes, creatingAlgorithms, IBoard } from '../../typings/boardTypes';
import BoardModalMenuType from '../BoardModalMenuType';
import BoardModalMenuAlgorithm from '../BoardModalMenuAlgorithm';
import BoardModalFinal from '../BoardModalFinal';
import { createBoard } from '../../containers/Boards/logic/actionTypes';

interface Props {
	setIsModalShown(params: boolean): void;

	onCreateBoard(board: createBoard): void;
}

enum ModalNames {
	selectType,
	selectAlgorithm,
	createBoard,
}

const CreateBoardModal = (props: Props) => {
	const [modalWindowName, selectModalWindowName] = useState<ModalNames>(ModalNames.selectType);
	const { setIsModalShown, onCreateBoard } = props;
	const [isCreateDisabled, changeSubmitStatus] = useState(true);

	const [board, setBoard] = useState<IBoard>({
		boardType: boardTypes.scrum,
		algorithm: creatingAlgorithms.existingProject,
		projects: [],
		name: '',
		admin: '',
	});

	const onCancelClick = () => {
		selectModalWindowName(ModalNames.selectType);
		setIsModalShown(false);
	};

	const onRadioChange = (algorithmType: creatingAlgorithms) => {
		setBoard({
			...board,
			algorithm: algorithmType,
		});
	};

	const onTypeSelection = (type: boardTypes) => {
		selectModalWindowName(ModalNames.selectAlgorithm);
		setBoard({
			...board,
			boardType: type,
		});
	};

	return (
		<Modal
			closeIcon
			onClose={() => setIsModalShown(false)}
			onOpen={() => setIsModalShown(true)}
			open={true}
			size={'small'}
			dimmer="inverted"
		>
			<Modal.Header>
				{modalWindowName !== ModalNames.createBoard ? 'Create a board' : 'Name this board'}
			</Modal.Header>
			<Modal.Content>
				{modalWindowName === ModalNames.selectType ? (
					<BoardModalMenuType onTypeSelection={onTypeSelection} />
				) : null}
				{modalWindowName === ModalNames.selectAlgorithm ? (
					<BoardModalMenuAlgorithm algorithm={board.algorithm} onRadioChange={onRadioChange} />
				) : null}
				{modalWindowName === ModalNames.createBoard ? (
					<BoardModalFinal board={board} setBoard={setBoard} changeSubmitStatus={changeSubmitStatus} />
				) : null}
			</Modal.Content>
			<Modal.Actions>
				{modalWindowName !== ModalNames.selectType ? (
					<Button
						onClick={() => {
							selectModalWindowName(modalWindowName - 1);
						}}
					>
						Back
					</Button>
				) : null}
				{modalWindowName === ModalNames.selectAlgorithm ? (
					<Button color={'facebook'} onClick={() => selectModalWindowName(ModalNames.createBoard)}>
						Next
					</Button>
				) : null}
				{modalWindowName === ModalNames.createBoard ? (
					<Button
						color={'facebook'}
						disabled={isCreateDisabled}
						onClick={() => {
							const { algorithm, admin, ...boardData } = board;
							if (admin) {
								onCreateBoard({
									...boardData,
									createdBy: {
										id: admin,
									},
								});
							}
							onCancelClick();
						}}
					>
						Create board
					</Button>
				) : null}
				<Button color="blue" basic onClick={onCancelClick}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateBoardModal;
