import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import People from '../../pages/People';

const Routing: React.FC = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PublicRoute exact restricted={true} path="/people" component={People} />
	</Switch>
);

export default Routing;
