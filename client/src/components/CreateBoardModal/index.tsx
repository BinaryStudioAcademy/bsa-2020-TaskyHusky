import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { boardTypes, IBoard, creatingAlgorithms } from '../../typings/boardTypes';
import BoardModalMenuType from '../BoardModalMenuType';
import BoardModalFinal from '../BoardModalFinal';
import { createBoard } from '../../containers/Boards/logic/actionTypes';
import { useTranslation } from 'react-i18next';

interface Props {
	setIsModalShown(params: boolean): void;

	onCreateBoard(board: createBoard): void;
}

enum ModalNames {
	selectType,
	createBoard,
}

const CreateBoardModal = (props: Props) => {
	const [modalWindowName, selectModalWindowName] = useState<ModalNames>(ModalNames.selectType);
	const [isCreateDisabled, setCreateButtonDisabled] = useState(true);
	const { setIsModalShown, onCreateBoard } = props;

	const { t } = useTranslation();

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

	const onTypeSelection = (type: boardTypes) => {
		selectModalWindowName(ModalNames.createBoard);
		setBoard({
			...board,
			boardType: type,
		});
	};

	return (
		<Modal onClose={() => setIsModalShown(false)} onOpen={() => setIsModalShown(true)} open={true} size="small">
			<Modal.Header>
				{modalWindowName !== ModalNames.createBoard ? t('create_a_board') : t('name_this_board')}
			</Modal.Header>
			<Modal.Content>
				{modalWindowName === ModalNames.selectType ? (
					<BoardModalMenuType onTypeSelection={onTypeSelection} />
				) : null}
				{modalWindowName === ModalNames.createBoard ? (
					<BoardModalFinal
						board={board}
						setBoard={setBoard}
						setCreateButtonDisabled={setCreateButtonDisabled}
					/>
				) : null}
			</Modal.Content>
			<Modal.Actions>
				{modalWindowName !== ModalNames.selectType ? (
					<Button
						className="contentBtn"
						onClick={() => {
							selectModalWindowName(modalWindowName - 1);
						}}
					>
						{t('back')}
					</Button>
				) : null}
				{modalWindowName === ModalNames.createBoard ? (
					<Button
						className="primaryBtn"
						disabled={isCreateDisabled}
						onClick={() => {
							const { admin, ...boardData } = board;
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
						{t('create_a_board')}
					</Button>
				) : null}
				<Button className="cancelBtn" onClick={onCancelClick}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateBoardModal;
