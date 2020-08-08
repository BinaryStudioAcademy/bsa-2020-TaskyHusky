import React from 'react';
import SignUpForm from 'containers/SignUpForm';
import { Grid, Header, Segment, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUp: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Grid textAlign="center" verticalAlign="middle" className="fill" columns="1">
			<Grid.Column style={{ maxWidth: 400 }}>
				<Header color="blue" size="large">
					{t('sign_up_header')}
				</Header>
				<Segment>
					<SignUpForm />
				</Segment>
				<Message>
					{t('already_with_us')} <NavLink to="/login">{t('log_in')}</NavLink>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default SignUp;
