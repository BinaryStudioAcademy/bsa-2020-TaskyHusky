import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './styles.module.scss';
import { Button, Header, Modal, Form, Checkbox, Popup, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import { ScrumBoardState } from 'containers/Board/Scrum/logic/state';
import 'react-datepicker/dist/react-datepicker.css';
import { getNextDate } from './helpers';
import { DURATIONS } from './constants';

type Props = { clickAction: any; isOpen: boolean };

const CreateSprintModal = (props: Props) => {
	const scrumBoardState: ScrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [isNameValid, setIsNameValid] = useState<boolean>(true);

	const resetLocalState = () => {
		setIsActive(false);
		setIsCompleted(false);
		setIsNameValid(true);
		setName('');
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

		const {
			board: { id: boardId },
			project: { id: projectId },
		} = scrumBoardState;
		const sprint = {
			sprintName: name.trim(),
			isActive,
			isCompleted,
			board: boardId,
			project: projectId,
			startDate,
			endDate,
		};
		dispatch(actions.createSprintTrigger({ sprint: sprint }));
		resetLocalState();
		props.clickAction();
	};

	const [duration, setDuration] = useState<number | 'custom'>(1);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(getNextDate(duration, startDate));
	const [endDateDisable, setEndDateDisable] = useState(true);
	const [isDateValid, setIsDateValid] = useState(true);

	// const validateDate = () => {
	// 	const isValid = endDate > startDate;
	// 	setIsDateValid(isValid);
	// };

	const handleStartDatePick = (date: Date) => {
		setStartDate(date);
		if (duration !== 'custom') {
			setEndDate(getNextDate(duration, date as Date));
		}
		const isValid = endDate > date;
		setIsDateValid(isValid);
	};

	const handleEndDatePick = (date: Date) => {
		setEndDate(date as Date);
		const isValid = date > startDate;
		setIsDateValid(isValid);
	};

	const handleDurationPick = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		const { value } = data;

		if (value === 'custom') {
			setEndDateDisable(false);
			setDuration(value);
		} else if (typeof value === 'number') {
			setDuration(value);
			setEndDate(getNextDate(value, startDate));
			setEndDateDisable(true);
			setIsDateValid(true);
		}
	};

	return (
		<Modal size="tiny" dimmer="inverted" onClose={handleClose} open={props.isOpen}>
			<Header>{t('create_sprint')}</Header>
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
									value={name}
									error={!isNameValid}
									onFocus={() => {
										setIsNameValid(true);
									}}
									onBlur={() => {
										setIsNameValid(name.trim().length !== 0);
									}}
									onChange={(event) => {
										setName(event.target.value);
									}}
								/>
							}
						/>
					</Form.Field>
					<Form.Field
						label="Duration"
						control={() => (
							<Dropdown
								value={duration}
								placeholder="Duration"
								search
								selection
								options={DURATIONS}
								onChange={handleDurationPick}
							/>
						)}
					/>
					<Form.Field
						label="Start date"
						error={!isDateValid}
						control={() => (
							<DatePicker
								name="StartTime"
								dateFormat="MM/dd/yyyy h:mm aa"
								showTimeSelect
								selected={startDate}
								onChange={handleStartDatePick}
							/>
						)}
					/>
					<Form.Field
						label="End date"
						control={() => (
							<DatePicker
								disabled={endDateDisable}
								name="EndTime"
								dateFormat="MM/dd/yyyy h:mm aa"
								showTimeSelect
								selected={endDate}
								onChange={handleEndDatePick}
							/>
						)}
					/>
					<Form.Field>
						<Checkbox
							toggle
							disabled
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
							disabled
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
					disabled={!isDateValid}
					onClick={handleSubmit}
					content={t('submit')}
					labelPosition="right"
					icon="checkmark"
					primary
				/>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateSprintModal;
