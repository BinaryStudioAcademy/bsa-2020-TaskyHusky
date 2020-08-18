import React, { useState, SyntheticEvent } from 'react';
import { Button, Header, Icon, Modal, Form, Checkbox, InputOnChangeData } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { useTranslation } from 'react-i18next';

type Props = {
	sprintName: string;
	sprintId: string;
	sprintIsActive: boolean;
	sprintIsCompleted: boolean;
	isOpen: boolean;
	clickAction: any;
	sprintIssues: any;
};

const EditSprintModal = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { sprintName, sprintIsActive, sprintIsCompleted, sprintId } = props;
	const [isActive, setIsActive] = useState(sprintIsActive);
	const [isCompleted, setIsCompleted] = useState(sprintIsCompleted);
	const [name, setName] = useState(sprintName);

	const handleNoButtonClick = () => {
		props.clickAction();
	};

	const handleYesButtonClick = () => {
		const sprintData = {
			id: sprintId,
			sprintName: name,
			isActive,
			isCompleted,
		};

		console.log(sprintData);
		dispatch(actions.updateSprintDataTrigger({ sprint: sprintData }));
		props.clickAction();
	};

	return (
		<Modal onClose={props.clickAction} open={props.isOpen} size="small">
			<Header>Edit sprint: {sprintName}</Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<label>Sprint Name</label>
						<input
							placeholder="Enter sprint name"
							value={name ? name : ''}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							toggle
							label={isActive ? 'Sprint will be marked as active' : 'Sprint will be marked as inactive'}
							checked={isActive}
							onChange={() => {
								setIsActive(!isActive);
							}}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							toggle
							label={
								isCompleted
									? 'Sprint will be marked as completed'
									: 'Sprint will be marked as not completed'
							}
							checked={isCompleted}
							onChange={() => {
								setIsCompleted(!isCompleted);
							}}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button color="red" inverted onClick={handleNoButtonClick}>
					<Icon name="remove" /> {t('cancel')}
				</Button>
				<Button color="green" inverted onClick={handleYesButtonClick}>
					<Icon name="checkmark" /> {t('delete')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default EditSprintModal;
