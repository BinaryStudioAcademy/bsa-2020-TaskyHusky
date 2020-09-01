import React, { useState } from 'react';
import { Button, Header, Modal, Form, Checkbox, Popup, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { ScrumBoardState } from 'containers/Board/Scrum/logic/state';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getNextDate } from './helpers';
import ru from 'date-fns/locale/ru';

type Props = {
	sprintName: string;
	sprintId: string;
	sprintIsActive: boolean;
	sprintIsCompleted: boolean;
	isOpen: boolean;
	clickAction: any;
	sprintIssues: WebApi.Result.IssueResult[];
	startDate: Date | undefined;
	endDate: Date | undefined;
};

const EditSprintModal = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const {
		sprintName,
		sprintIsActive,
		sprintIsCompleted,
		sprintId,
		startDate: sprintStartDate,
		endDate: sprintEndDate,
	} = props;

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
			startDate,
			endDate,
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

	const getLocale = () => {
		const lng = localStorage.getItem('session:lng');
		switch (lng) {
			case 'ru':
				return ru;
			case 'ua':
				return ru;
			case 'en':
				return 'en';
			default:
				return 'en';
		}
	};

	const DURATIONS = [
		{ key: 1, text: `1 ${t('week')}`, value: 1 },
		{ key: 2, text: `2 ${t('weeks')}`, value: 2 },
		{ key: 3, text: `3 ${t('weeks')}`, value: 3 },
		{ key: 4, text: `4 ${t('weeks')}`, value: 4 },
		{ key: 5, text: t('custom'), value: 'custom' },
	];

	const [duration, setDuration] = useState<number | 'custom'>(sprintEndDate ? 'custom' : 1);
	const [startDate, setStartDate] = useState(sprintStartDate ? new Date(sprintStartDate) : new Date());
	const [endDateDisable, setEndDateDisable] = useState(sprintEndDate && isActive ? false : true);
	const [isDateValid, setIsDateValid] = useState(true);
	const [endDate, setEndDate] = useState(sprintEndDate ? new Date(sprintEndDate) : getNextDate(1, startDate));
	const [startDateDisable, setStartDateDisable] = useState(isActive ? false : true);
	const [durationDisable, setDurationDisable] = useState(isActive ? false : true);

	const handleStartDatePick = (date: Date | null) => {
		if (!date) {
			return;
		}
		setStartDate(date);

		const nextEndDate = getNextDate(duration, date);
		if (duration !== 'custom') {
			setEndDate(nextEndDate);
		}

		const isValid = (duration === 'custom' ? endDate : nextEndDate) > date;
		setIsDateValid(isValid);
	};

	const handleEndDatePick = (date: Date | null) => {
		if (!date) {
			return;
		}
		setEndDate(date);
		const isValid = date > startDate;
		setIsDateValid(isValid);
	};

	const handleDurationPick = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		const { value } = data;

		if (value === 'custom') {
			setEndDateDisable(false);
			setDuration(value);
		} else if (typeof value === 'number') {
			setEndDate(getNextDate(value, startDate));
			setDuration(value);
			setEndDateDisable(true);
			setIsDateValid(true);
		}
	};

	const toggleSprintActive = () => {
		const updatedIsActive = !isActive;
		setIsActive(updatedIsActive);
		if (updatedIsActive) {
			setStartDateDisable(false);
			setDurationDisable(false);
			setEndDateDisable(duration === 'custom' ? false : true);
		} else {
			setStartDateDisable(true);
			setDurationDisable(true);
			setEndDateDisable(true);
		}
	};

	return (
		<Modal onClose={handleClose} open={props.isOpen} size="tiny" dimmer="inverted">
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
					<Form.Field
						label={t('duration')}
						control={() => (
							<Dropdown
								disabled={durationDisable}
								value={duration}
								placeholder={t('duration')}
								search
								selection
								options={DURATIONS}
								onChange={handleDurationPick}
							/>
						)}
					/>
					<Form.Field
						label={t('startDate')}
						error={!isDateValid}
						control={() => (
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<DatePicker
									disabled={startDateDisable}
									locale={getLocale()}
									name="StartTime"
									dateFormat="MM/dd/yyyy h:mm aa"
									showTimeSelect
									selected={startDate}
									onChange={handleStartDatePick}
								/>
								{!isDateValid && <span style={{ color: 'red' }}>{t('dateValidationError')}</span>}
							</div>
						)}
					/>
					<Form.Field
						label={t('endDate')}
						control={() => (
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<DatePicker
									locale={getLocale()}
									disabled={endDateDisable}
									name="EndTime"
									dateFormat="MM/dd/yyyy h:mm aa"
									showTimeSelect
									selected={endDate}
									onChange={handleEndDatePick}
								/>
							</div>
						)}
					/>
					<Form.Field>
						<Checkbox
							toggle
							disabled={isActivationToggleDisabled(scrumBoardState)}
							label={isActive ? t('mark_sprint_as_active') : t('mark_sprint_as_inactive')}
							checked={isActive}
							onChange={toggleSprintActive}
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
