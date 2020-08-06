import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import ProfilePage from 'containers/ProfilePage';

const Routing: React.FC = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/profile/:id" component={ProfilePage} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
	</Switch>
);

export default Routing;
