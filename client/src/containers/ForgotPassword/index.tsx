import React, { useState, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Header, Form, Divider, Segment, Button, List, Image, Container, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { normalizeEmail } from 'helpers/email.helper';
import * as actions from '../LoginPage/logic/actions';
import emailSent from 'assets/images/email-sent.png';

type Props = {
	onClose: (arg: boolean) => void;
};
export const ForgotPassword: React.FC<Props> = ({ onClose }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isEmailSent, setEmailSent] = useState(false);
	const [email, setEmail] = useState<string>('');

	const handleSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		dispatch(actions.forgotPassword({ email }));
		setEmailSent(true);
	};

	const returnToRecovery: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setEmailSent(false);
	};

	return (
		<Modal onClose={() => onClose(false)} open size="mini" className={styles.modalWrapper}>
			<Header as="h1" className={styles.mainHeader}>
				{t('forgot_password_header')}
			</Header>
			<Segment basic className={styles.segmentBody}>
				{!isEmailSent && (
					<Form onSubmit={handleSubmit}>
						<p>{t('forgot_password_email_link')}</p>
						<Form.Input
							placeholder={t('email')}
							type="text"
							icon="at"
							value={email}
							onChange={(event) => {
								setEmail(normalizeEmail(event.target.value));
							}}
						/>
						<Button className={styles.continueButton}>{t('forgot_password_button')}</Button>
					</Form>
				)}
				{isEmailSent && (
					<Container>
						<Image size="small" src={emailSent} centered />
						<div className={styles.textBlock}>
							<p>{t('forgot_password_email_sent_message')}</p>
							<p>{email}</p>
						</div>
					</Container>
				)}
				<Divider />
				<List horizontal link className={styles.list}>
					<List.Item className={styles.listItem}>
						<span onClick={() => onClose(false)} className={styles.returnToMain}>
							<span> {t('forgot_password_return_button')} </span>
						</span>
					</List.Item>
					{isEmailSent && (
						<List.Item className={styles.listItem}>
							<span onClick={returnToRecovery} className={styles.returnToMain}>
								{t('forgot_password_resend_email')}
							</span>
						</List.Item>
					)}
				</List>
			</Segment>
		</Modal>
	);
};

export default ForgotPassword;
