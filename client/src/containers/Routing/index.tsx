import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import Team from 'pages/Team';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import CreateIssue from 'pages/CreateIssue';
import Header from 'containers/Header';
import IssuePage from 'pages/IssuePage';
import Filters from 'pages/Filters';
import ProjectsPage from 'pages/ProjectsPage';

const Routing: React.FC = () => {
	return (
		<Switch>
			<PrivateRoute exact path="/createIssue" component={CreateIssue} />
			<PrivateRoute path="/issue/:key" component={IssuePage} />
			<PublicRoute exact restricted={true} path="/login" component={Login} />
			<PrivateRoute exact path="/header" component={Header} />;
			<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
			<PrivateRoute exact path="/projects" component={ProjectsPage} />
			<PrivateRoute exact path="/team/:id" component={Team} />
			<PrivateRoute exact path="/filters" component={Filters} />
		</Switch>
	);
};

export default Routing;
