import React, { SyntheticEvent, useState, useEffect } from 'react';
import * as actions from '../LoginPage/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Form, Grid, Header, List, Popup, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../ForgotPassword/styles.module.scss';
import { RootState } from 'typings/rootState';
import { Link, useParams } from 'react-router-dom';
import PasswordCheck from '../../components/PasswordCheck';
import PasswordInput from '../../components/common/PasswordInput';

const ResetPassword: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { token } = useParams();

	const [password, setPassword] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isSubmited, setIsSubmited] = useState<boolean>(false);
	const [isTokenNull, setIsTokenNull] = useState<boolean>(false);
	const { isAuthorized, user } = useSelector((state: RootState) => ({
		isAuthorized: state.auth.isAuthorized,
		user: state.auth.user,
	}));

	const handleSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		dispatch(actions.resetPassword({ id: token, password }));
		setIsSubmited(true);
	};

	useEffect(() => {
		setIsTokenNull(!user?.resetEmailToken && !!user?.email);
	}, [user]);
	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				{isSubmited && isTokenNull ? (
					<Redirect to={isAuthorized ? '/my-work' : '/login'} />
				) : (
					<Grid.Column className={styles.column}>
						<Header as="h1" color="blue" className={styles.mainHeader}>
							{t('reset_password_header')}
						</Header>
						<Segment>
							<Form onSubmit={handleSubmit}>
								<Popup
									className={styles.errorPopup}
									on={[]}
									open={!isPasswordValid}
									position="bottom center"
									content={t('invalid_password')}
									trigger={
										<PasswordInput onChange={setPassword} onChangeValid={setIsPasswordValid} />
									}
								/>
								<PasswordCheck pass={password} acceptLength={6} />
								<Button
									positive
									className={styles.continueButton}
									disabled={!isPasswordValid || password === ''}
								>
									{t('continue')}
								</Button>
							</Form>
							<Divider />
							<List bulleted horizontal link className={styles.list}>
								<List.Item className={styles.listItem}>
									<Link to="/login" children={t('reset_password_problem')} />
								</List.Item>
							</List>
						</Segment>
					</Grid.Column>
				)}
			</Grid>
		</>
	);
};

export default ResetPassword;
