import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/LogIn';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import Header from 'containers/Header';
import PrivateRoute from 'components/PrivateRoute';
import CreateIssueExamplePage from 'containers/CreateIssueModal/examplePage';

const Routing: React.FC = () => (
	<Switch>
		<PrivateRoute exact path="/" component={Example} />
		<PrivateRoute exact path="/createIssue" component={CreateIssueExamplePage} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PublicRoute exact restricted={true} path="/header" component={Header} />
	</Switch>
);

export default Routing;
