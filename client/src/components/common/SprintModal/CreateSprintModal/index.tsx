import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Form, Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import { ScrumBoardState } from 'containers/Board/Scrum/logic/state';

type Props = { clickAction: any; isOpen: boolean };

const CreateSprintModal = (props: Props) => {
	const scrumBoardState: ScrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [name, setName] = useState<string>('');

	const handleNoButtonClick = () => {
		props.clickAction();
	};

	const handleYesButtonClick = () => {
		const { boardId, projectId } = scrumBoardState;
		const sprint = {
			sprintName: name,
			isActive,
			isCompleted,
			board: boardId,
			project: projectId,
		};

		console.log(sprint);

		dispatch(actions.createSprintTrigger({ sprint: sprint }));

		props.clickAction();
	};

	return (
		<Modal onClose={props.clickAction} open={props.isOpen} size="small">
			<Header>Create sprint</Header>
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
					<Icon name="checkmark" /> {t('submit')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateSprintModal;
