import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import { Redirect } from 'react-router-dom';
import { validateFilterName } from 'helpers/validationRules';

const SaveFilterModal = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isFilterCreatedByCurrentUser] = useState(false);
	const [name, setName] = useState('');
	const [isNameValid, setIsNameValid] = useState<boolean>(false);
	const [isNameChanged, setIsNameChanged] = useState<boolean>(false);

	const { isLoading, isModalOpened, savedFilterId, redirecting } = useSelector(
		(rootState: RootState) => rootState.saveFilter,
	);
	const { id } = useSelector((rootState: RootState) => rootState.auth.user) as WebApi.Entities.UserProfile;
	const { filterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);

	const onSaveFilter = (): void => {
		const notEmptyFilterParts = filterParts.filter(({ members, searchText }) => members.length > 0 || !!searchText);

		dispatch(
			actions.startSavingFilter({
				name: name.trim(),
				owner: id,
				filterParts: notEmptyFilterParts,
			}),
		);
	};

	const onModalClose = () => {
		dispatch(actions.closeModal());
		dispatch(actions.resetState());
		setName('');
		setIsNameValid(false);
		setIsNameChanged(false);
	};

	const onModalOpen = () => {
		dispatch(actions.openModal());
	};

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.value;
		setName(name);
		setIsNameChanged(true);
		setIsNameValid(validateFilterName(name.trim()));
	};

	return (
		<>
			{redirecting && <Redirect to={`/advancedSearch/${savedFilterId}`} />}
			<Modal onClose={onModalClose} onOpen={onModalOpen} open={isModalOpened} size="tiny">
				<>
					<Modal.Header className="standartHeader">{t('save_filter')}</Modal.Header>

					<Modal.Content>
						<Form className={styles.form_container}>
							<Form.Field>
								{isFilterCreatedByCurrentUser ? null : <p>{t('filter_not_created_by_you')}</p>}
							</Form.Field>
							<Form.Field>
								<Popup
									flowing
									open={!isNameValid && isNameChanged}
									content={t('min4_max40_length_message')}
									trigger={
										<div>
											<label className="standartLabel">{t('filter_name')}</label>
											<Form.Input
												onChange={onNameChanged}
												value={name}
												placeholder={t('enter_filter_name')}
												onBlur={() => {
													setIsNameValid(validateFilterName(name.trim()));
													setIsNameChanged(true);
												}}
												onFocus={() => {
													setIsNameValid(validateFilterName(name.trim()));
												}}
											/>
										</div>
									}
								/>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button className={styles.primaryBtn} color="grey" onClick={onModalClose}>
							{t('cancel')}
						</Button>
						<Button
							className={styles.cancelBtn}
							content={t('submit')}
							labelPosition="right"
							icon="checkmark"
							onClick={onSaveFilter}
							primary
							loading={isLoading}
							disabled={isLoading || !isNameValid}
						/>
					</Modal.Actions>
				</>
			</Modal>
		</>
	);
};

export default SaveFilterModal;
