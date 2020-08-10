import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { boardTypes, creatingAlgorithms, IBoard } from './types';
import FirstMenu from './modals/firstMenu';
import SecondMenu from './modals/secondMenu';
import ThirdMenuExisting from './modals/thirdMenuExisting';

interface Props {
	setIsModalShown(params: boolean): void;

	onCreateProject(): void;
}

const CreateBoardModal = (props: Props) => {
	const [isTypeSelected, selectType] = useState(false);
	const [isAlgorithmSelected, selectAlgorithm] = useState(false);
	const { setIsModalShown, onCreateProject } = props;
	const [isCreateDisabled, changeSubmitStatus] = useState(true);

	const [board, setBoard] = useState<IBoard>({
		type: boardTypes.scrum,
		algorithm: creatingAlgorithms.newProject,
		projectName: '',
		projectKey: '',
		projectLead: '',
	});

	const onCancelClick = () => {
		selectType(false);
		selectAlgorithm(false);
		setIsModalShown(false);
	};

	const onRadioChange = (algorithmType: creatingAlgorithms) => {
		setBoard({
			...board,
			algorithm: algorithmType,
		});
	};

	const onTypeSelection = (type: boardTypes) => {
		selectType(true);
		setBoard({
			...board,
			type: boardTypes.kanban,
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
				{!isAlgorithmSelected
					? 'Create a board'
					: board.algorithm === creatingAlgorithms.newProject
					? 'New project with board'
					: 'Name this board'}
			</Modal.Header>
			<Modal.Content>
				{!isTypeSelected ? <FirstMenu onTypeSelection={onTypeSelection} /> : null}
				{isTypeSelected && !isAlgorithmSelected ? (
					<SecondMenu algorithm={board.algorithm} onRadioChange={onRadioChange} />
				) : null}
				{isAlgorithmSelected && board.algorithm === creatingAlgorithms.existingProject ? (
					<ThirdMenuExisting board={board} setBoard={setBoard} changeSubmitStatus={changeSubmitStatus} />
				) : null}
			</Modal.Content>
			<Modal.Actions>
				{isTypeSelected ? (
					<Button
						onClick={() => {
							if (isAlgorithmSelected) {
								selectAlgorithm(false);
							} else {
								selectType(false);
							}
						}}
					>
						Back
					</Button>
				) : null}
				{isTypeSelected && !isAlgorithmSelected ? (
					<Button color={'facebook'} onClick={() => selectAlgorithm(true)}>
						Next
					</Button>
				) : null}
				{isAlgorithmSelected ? (
					<Button color={'facebook'} disabled={isCreateDisabled}>
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
