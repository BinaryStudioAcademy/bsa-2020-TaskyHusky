import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Projects from 'containers/Projects';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import CreateIssue from 'pages/CreateIssue';
import { loadTypes, loadPriorities } from 'pages/CreateIssue/logic/actions';
import { useDispatch } from 'react-redux';
import IssuePage from 'pages/IssuePage';

const Routing: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTypes());
		dispatch(loadPriorities());
	}, [dispatch]);

	return (
		<Switch>
			<PrivateRoute exact path="/createIssue" component={CreateIssue} />
			<PrivateRoute path="/issue/:key" component={IssuePage} />
			<PublicRoute exact restricted={true} path="/login" component={Login} />
			<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
			<PrivateRoute exact path="/projects" component={Projects} />
		</Switch>
	);
};

export default Routing;
