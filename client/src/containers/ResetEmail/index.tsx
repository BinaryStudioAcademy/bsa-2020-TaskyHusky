import React, { SyntheticEvent, useState } from 'react';
import { requestChangeEmail } from 'containers/ProfilePage/logiс/actions';
import { useDispatch } from 'react-redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import SubmitedInput from '../../components/SubmitedInput';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const { token, emailBtoa } = useParams();

	const email = Buffer.from(emailBtoa, 'base64').toString();

	const handleChange = (e: any) => {
		setPassword(e.target.value);
	};

	const handleSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		dispatch(requestChangeEmail({ email, password, token }));
	};
	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" color="blue" className={styles.mainHeader}>
						{t('confirm_email_change')}
					</Header>
					<Segment>
						<Form onSubmit={handleSubmit}>
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
			</Grid>
		</>
	);
};

export default ResetPassword;
