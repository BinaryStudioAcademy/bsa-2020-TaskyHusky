import React from 'react';
import { Switch } from 'react-router-dom';
import Projects from 'containers/Projects';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import CreateIssueExamplePage from 'containers/CreateIssueModal/examplePage';

const Routing: React.FC = () => (
	<Switch>
		<PrivateRoute exact path="/createIssue" component={CreateIssueExamplePage} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PrivateRoute exact path="/projects" component={Projects} />
	</Switch>
);

export default Routing;
