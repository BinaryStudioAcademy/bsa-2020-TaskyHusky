import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button, Popup } from 'semantic-ui-react';

import * as actions from '../../containers/People/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import styles from '../../containers/SignUpForm/styles.module.scss';
import { normalizeEmail } from '../../helpers/normalizeEmail.helper';
import validator from 'validator';

interface Props {
	isOpen: boolean;
	closeClb: () => void;
}

const AddPeopleModal: React.FC<Props> = ({ isOpen = false, closeClb }): ReactElement => {
	const [email, setEmail] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);

	const handlerSubmit = async () => {
		dispatch(actions.addPeople({ id: authStore.user?.id || '', email }));

		setEmail('');
		closeClb();
	};

	const areEmailsEqual = (email1: string | undefined, email2: string) => {
		if (!email1) {
			return false;
		}
		return email1.toLowerCase().trim() === email2.toLowerCase().trim();
	};

	return (
		<Modal open={isOpen} onClose={closeClb} closeIcon size="tiny">
			<Modal.Header>{t('add_people')}</Modal.Header>
			<Modal.Content image scrolling>
				<Form onSubmit={handlerSubmit}>
					<p>{t('add_people_text')}</p>
					<Popup
						className={styles.errorPopup}
						on={[]}
						open={!emailValid}
						position="top center"
						content={
							areEmailsEqual(authStore.user?.email, email) ? t('enter_foreign_email') : t('invalid_email')
						}
						trigger={
							<Form.Input
								type="text"
								icon="at"
								placeholder={t('add_people_email_placeholder')}
								value={email}
								onChange={(event) => {
									console.log(emailValid);
									setEmail(normalizeEmail(event.target.value));
									setEmailValid(true);
								}}
								onBlur={() =>
									setEmailValid(
										validator.isEmail(email) && !areEmailsEqual(authStore.user?.email, email),
									)
								}
								error={!emailValid}
							/>
						}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					onClick={() => {
						setEmail('');
						setEmailValid(true);
						closeClb();
					}}
				>
					{t('cancel')}
				</Button>
				<Button primary onClick={handlerSubmit} disabled={!(emailValid && !!email)}>
					{t('send')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddPeopleModal);
