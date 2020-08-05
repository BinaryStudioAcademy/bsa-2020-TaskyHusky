import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import PrivateRoute from 'components/PrivateRoute';
import CreateIssueExamplePage from 'containers/CreateIssueModal/examplePage';

const Routing: React.FC = () => (
	<Switch>
		<PrivateRoute exact path="/" component={Example} />
		<PrivateRoute exact path="/createIssue" component={CreateIssueExamplePage} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
	</Switch>
);

export default Routing;
