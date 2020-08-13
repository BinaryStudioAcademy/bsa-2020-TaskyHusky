import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';
import styles from './styles.module.scss';

const SaveFilterModal = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { isLoading, isModalOpened, isFilterSaved } = useSelector((rootState: RootState) => rootState.saveFilter);
	const { id } = useSelector((rootState: RootState) => rootState.auth.user) as WebApi.Entities.UserProfile;

	if (isFilterSaved) {
		dispatch(actions.resetState());
	}

	const [isFilterCreatedByCurrentUser] = useState(false);

	const [name, setName] = useState<string>('');

	const onSaveFilter = (): void => {
		dispatch(
			actions.startSavingFilter({
				name,
				ownerId: id,
			}),
		);
	};

	const onModalClose = () => {
		dispatch(actions.closeModal());
	};

	const onModalOpen = () => {
		dispatch(actions.openModal());
	};

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.value;
		setName(name);
	};

	return (
		<Modal
			closeIcon
			onClose={onModalClose}
			onOpen={onModalOpen}
			open={isModalOpened}
			size="tiny"
			dimmer="inverted"
			trigger={
				<Button compact className={styles.saveBtn}>
					{t('save_as')}
				</Button>
			}
		>
			<>
				<Modal.Header>{t('save_filter')}</Modal.Header>

				<Modal.Content>
					<Form className={styles.form_container}>
						<Form.Field>
							{isFilterCreatedByCurrentUser ? null : <p>{t('filter_not_created_by_you')}</p>}
						</Form.Field>
						<Form.Field>
							<label>{t('filter_name')}</label>
							<input onChange={onNameChanged} value={name} placeholder={t('enter_filter_name')} />
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="grey" onClick={onModalClose}>
						{t('cancel')}
					</Button>
					<Button
						content={t('submit')}
						labelPosition="right"
						icon="checkmark"
						onClick={onSaveFilter}
						primary
						loading={isLoading}
						disabled={isLoading}
					/>
				</Modal.Actions>
			</>
		</Modal>
	);
};

export default SaveFilterModal;
