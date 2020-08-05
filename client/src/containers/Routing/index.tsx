import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Projects from 'containers/Projects';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';

const Routing: React.FC = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PrivateRoute exact path="/projects" component={Projects} />
	</Switch>
);

export default Routing;
