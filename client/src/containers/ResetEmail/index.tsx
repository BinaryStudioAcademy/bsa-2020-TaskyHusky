import React, { SyntheticEvent, useState, useEffect } from 'react';
import { requestChangeEmail } from 'containers/ProfilePage/logiс/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { useParams } from 'react-router-dom';
import SubmitedInput from '../../components/SubmitedInput';
import emailImg from 'icons/profile/emailImg.svg';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const { token, emailBtoa } = useParams();
	const [isEmailUpdated, setIsEmailUpdates] = useState<boolean>(false);
	const email = Buffer.from(emailBtoa, 'base64').toString();
	const currentEmail = useSelector((state: RootState) => state.user.email);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		dispatch(requestChangeEmail({ email, password, token }));
	};

	useEffect(() => {
		setIsEmailUpdates(currentEmail === email);
	}, [currentEmail, email]);
	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				{isEmailUpdated ? (
					<div className={styles.column}>
						<img src={emailImg} alt="email" />
						<h1 className={styles.mainHeader}>{t('email_update')}</h1>
					</div>
				) : (
					<Grid.Column className={styles.column}>
						<h1 className={styles.mainHeader}>{t('confirm_email_change')}</h1>
						<Segment>
							<Form className={styles.form} onSubmit={handleSubmit}>
								<SubmitedInput
									text={password}
									propKey="password"
									type="password"
									placeholder="Your password"
									handleChange={handleChange}
									title={`${t('type_pass_confirm_email')} ${email}`}
								/>
								<Button className={styles.submitButton} type="submit" disabled={!password}>
									{t('save_changes')}
								</Button>
							</Form>
						</Segment>
					</Grid.Column>
				)}
			</Grid>
		</>
	);
};

export default ResetPassword;
