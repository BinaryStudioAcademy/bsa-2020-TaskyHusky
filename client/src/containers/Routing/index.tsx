import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import SignUp from 'pages/SignUp';
import Filters from 'pages/Filters';

const Routing: React.FC = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PrivateRoute exact path="/filters" component={Filters} />
	</Switch>
);

export default Routing;
