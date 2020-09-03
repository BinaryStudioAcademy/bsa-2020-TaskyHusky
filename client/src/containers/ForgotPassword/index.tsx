import React, { useState, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Header, Form, Divider, Segment, Button, Grid, List, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { normalizeEmail } from 'helpers/email.helper';
import * as actions from '../LoginPage/logic/actions';
import emailSent from 'assets/images/email-sent.png';

export const ForgotPassword: React.FC = () => {
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
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" color="blue" className={styles.mainHeader}>
						{t('forgot_password_header')}
					</Header>
					<Segment>
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
						<List bulleted horizontal link className={styles.list}>
							<List.Item className={styles.listItem}>
								<Link to="/login" children={t('forgot_password_return_button')} />
							</List.Item>
							{isEmailSent && (
								<List.Item className={styles.listItem}>
									<Link
										to="/"
										onClick={returnToRecovery}
										children={t('forgot_password_resend_email')}
									/>
								</List.Item>
							)}
						</List>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default ForgotPassword;
