import React from 'react';
import SignUpForm from 'containers/SignUpForm';
import { Grid, Header, Segment } from 'semantic-ui-react';

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
			</Grid.Column>
		</Grid>
	);
};

export default SignUp;
