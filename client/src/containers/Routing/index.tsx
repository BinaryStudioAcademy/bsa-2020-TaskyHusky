import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Projects from 'containers/Projects';
import Login from 'containers/LoginPage';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import Filters from 'pages/Filters';
import CreateIssueExamplePage from 'containers/CreateIssueModal/examplePage';

const Routing: React.FC = () => (
	<Switch>
		<PrivateRoute exact path="/" component={Example} />
		<PrivateRoute exact path="/createIssue" component={CreateIssueExamplePage} />
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
		<PrivateRoute exact path="/filters" component={Filters} />
		<PrivateRoute exact path="/projects" component={Projects} />
	</Switch>
);

export default Routing;
