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

type Props = { clickAction: any; isOpen: boolean };

const DURATIONS = [
	{ key: 1, text: '1 week', value: 1 },
	{ key: 2, text: '2 weeks', value: 2 },
	{ key: 3, text: '3 weeks', value: 3 },
	{ key: 4, text: '4 weeks', value: 4 },
	{ key: 5, text: 'custom', value: 5 },
];

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

	const getNextDate = (week: number, startDate: Date) => {
		const nextDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7 * week);
		return nextDate;
	};

	const [duration, setDuration] = useState(1);
	const [endDateDisable, setEndDateDisable] = useState(true);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(getNextDate(duration, startDate));

	const handleStartDatePick = (date: Date | null) => {
		if (date) {
			setStartDate(date as Date);
			setEndDate(getNextDate(duration, date as Date));
		}
	};

	const handleEndDatePick = (date: Date | null) => {
		if (date) {
			setEndDate(date as Date);
		}
	};

	const handleDurationPick = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		if (data.value === 5) {
			setEndDateDisable(false);
		} else {
			const newDuration = Number(data.value);
			setDuration(newDuration);
			setEndDate(getNextDate(newDuration, startDate));
			setEndDateDisable(true);
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
								defaultValue={duration}
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
				<Button onClick={handleSubmit} content={t('submit')} labelPosition="right" icon="checkmark" primary />
			</Modal.Actions>
		</Modal>
	);
};

export default CreateSprintModal;
