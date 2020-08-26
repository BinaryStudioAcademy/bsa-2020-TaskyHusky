import React, { useState } from 'react';
import { Button, Header, Modal, Form, Checkbox, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { ScrumBoardState } from 'containers/Board/Scrum/logic/state';
import { updateIssue } from 'pages/IssuePage/logic/actions';

type Props = {
	sprintName: string;
	sprintId: string;
	sprintIsActive: boolean;
	sprintIsCompleted: boolean;
	isOpen: boolean;
	clickAction: any;
	sprintIssues: WebApi.Entities.Issue[];
};

const EditSprintModal = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { sprintName, sprintIsActive, sprintIsCompleted, sprintId } = props;
	const [isActive, setIsActive] = useState<boolean>(sprintIsActive);
	const [isCompleted, setIsCompleted] = useState<boolean>(sprintIsCompleted);
	const [name, setName] = useState<string>(sprintName);
	const [isNameValid, setIsNameValid] = useState<boolean>(true);
	const scrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);

	const isActivationToggleDisabled = (scrumBoardState: ScrumBoardState): boolean => {
		const currentActiveSprint = scrumBoardState.sprints.find((sprint) => sprint.isActive);
		const currentActiveSprintId = currentActiveSprint ? currentActiveSprint.id : undefined;
		const boardHasActiveSprint = !!currentActiveSprintId;
		const sprintHasNoIssues = scrumBoardState.matchIssuesToSprint[sprintId]?.length === 0;
		const isCurrentSprintActive = currentActiveSprintId === sprintId;

		if (sprintHasNoIssues || isCompleted) {
			return true;
		}

		if (boardHasActiveSprint) {
			return !isCurrentSprintActive;
		}

		return false;
	};

	const resetLocalState = () => {
		setIsActive(sprintIsActive);
		setIsCompleted(sprintIsCompleted);
		setName(sprintName);
	};

	const handleClose = () => {
		resetLocalState();
		props.clickAction();
	};

	const handleSubmit = () => {
		if (name.trim().length === 0) {
			setIsNameValid(false);
			return;
		}
		const sprint = {
			id: sprintId,
			sprintName: name.trim(),
			isActive,
			isCompleted,
		};

		if (sprint.isCompleted) {
			props.sprintIssues.forEach((issue) => {
				if (issue.status?.title !== 'Done') {
					dispatch(
						updateIssue({
							id: issue.id,
							data: {
								sprint: null,
							},
						}),
					);
				}
			});
		}
		dispatch(actions.updateSprintDataTrigger({ sprint }));
		props.clickAction();
	};

	return (
		<Modal closeIcon onClose={handleClose} open={props.isOpen} size="tiny" dimmer="inverted">
			<Header>
				{t('edit_sprint')}: {sprintName}
			</Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<Popup
							className={styles.errorPopup}
							open={!isNameValid}
							content={t('sprint_name_cannot_be_empty')}
							on={[]}
							trigger={
								<Form.Input
									label={t('sprint_name')}
									placeholder={t('enter_sprint_name')}
									value={name ? name : ''}
									error={!isNameValid}
									onChange={(event) => {
										setName(event.target.value);
									}}
									onFocus={() => {
										setIsNameValid(true);
									}}
									onBlur={() => {
										setIsNameValid(name.trim().length !== 0);
									}}
								/>
							}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							toggle
							disabled={isActivationToggleDisabled(scrumBoardState)}
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
							disabled={isActive}
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
				<Button color="grey" onClick={handleClose} content={t('cancel')} />
				<Button
					labelPosition="right"
					icon="checkmark"
					primary
					onClick={handleSubmit}
					content={t('save_details')}
				/>
			</Modal.Actions>
		</Modal>
	);
};

export default EditSprintModal;
