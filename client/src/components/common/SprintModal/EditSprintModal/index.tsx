import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Form, Checkbox } from 'semantic-ui-react';
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
	const [isActive, setIsActive] = useState<boolean>(sprintIsActive);
	const [isCompleted, setIsCompleted] = useState<boolean>(sprintIsCompleted);
	const [name, setName] = useState<string>(sprintName);

	const handleNoButtonClick = () => {
		props.clickAction();
	};

	const handleYesButtonClick = () => {
		const sprint = {
			id: sprintId,
			sprintName: name,
			isActive,
			isCompleted,
		};

		dispatch(actions.updateSprintDataTrigger({ sprint }));
		props.clickAction();
	};

	return (
		<Modal onClose={props.clickAction} open={props.isOpen} size="small">
			<Header>
				{t('edit_sprint')}: {sprintName}
			</Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<label>{t('sprint_name')}</label>
						<input
							placeholder={t('enter_sprint_name')}
							value={name ? name : ''}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							toggle
							label={isActive ? t('mark_sprint_as_active') : t('mark_sprint_as_inactive')}
							checked={isActive}
							onChange={() => {
								setIsActive(!isActive);
							}}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							toggle
							label={isCompleted ? t('mark_sprint_as_completed') : t('mark_sprint_as_not_completed')}
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
					<Icon name="checkmark" /> {t('save_details')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default EditSprintModal;
