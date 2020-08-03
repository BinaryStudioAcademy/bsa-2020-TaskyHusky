import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
	</Switch>
);

export default Routing;
