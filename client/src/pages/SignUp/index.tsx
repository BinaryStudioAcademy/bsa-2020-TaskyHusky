import React from 'react';
import SignUpForm from 'containers/SignUpForm';
import { Grid, Header, Segment, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SignUp: React.FC = () => {
	return (
		<Grid textAlign="center" verticalAlign="middle" className="fill" columns="1">
			<Grid.Column style={{ maxWidth: 400 }}>
				<Header color="blue" size="large">
					Sign up to TaskyHusky
				</Header>
				<Segment>
					<SignUpForm />
				</Segment>
				<Message>
					Already with us? <NavLink to="/login">Log in</NavLink>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default SignUp;
