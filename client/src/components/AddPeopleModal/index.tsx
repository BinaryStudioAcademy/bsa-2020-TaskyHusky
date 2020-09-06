import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button, Popup } from 'semantic-ui-react';

import * as actions from '../../containers/People/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import styles from '../../containers/SignUpForm/styles.module.scss';
import { normalizeEmail, areEmailsEqual } from '../../helpers/email.helper';
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
	const currentUserEmail = authStore.user?.email ?? '';
	const isSameUser = areEmailsEqual(currentUserEmail, email);

	const handlerSubmit = async () => {
		dispatch(actions.addPeople({ id: authStore.user?.id || '', email }));

		setEmail('');
		closeClb();
	};

	return (
		<Modal open={isOpen} onClose={closeClb} size="tiny" dimmer="inverted">
			<Modal.Header>{t('add_people')}</Modal.Header>
			<Modal.Content image scrolling>
				<Form onSubmit={handlerSubmit}>
					<p>{t('add_people_text')}</p>
					<Popup
						className={styles.errorPopup}
						on={[]}
						open={!emailValid}
						position="top center"
						content={isSameUser ? t('enter_foreign_email') : t('invalid_email')}
						trigger={
							<Form.Input
								type="text"
								icon="at"
								placeholder={t('add_people_email_placeholder')}
								value={email}
								onChange={(event) => {
									setEmail(normalizeEmail(event.target.value));
									setEmailValid(true);
								}}
								onBlur={() => setEmailValid(validator.isEmail(email) && !isSameUser)}
								error={!emailValid}
							/>
						}
					/>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					className="cancelBtn"
					onClick={() => {
						setEmail('');
						setEmailValid(true);
						closeClb();
					}}
				>
					{t('cancel')}
				</Button>
				<Button className="primaryBtn" onClick={handlerSubmit} disabled={!(emailValid && !!email)}>
					{t('send')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default React.memo(AddPeopleModal);
