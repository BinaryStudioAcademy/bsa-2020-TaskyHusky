import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';

const Routing: React.FC = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
	</Switch>
);

export default Routing;
