import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Projects from 'pages/Projects';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import Team from 'pages/Team';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import CreateIssue from 'pages/CreateIssue';
import Header from 'containers/Header';
import { loadTypes, loadPriorities } from 'pages/CreateIssue/logic/actions';
import { fetchFilterDefs } from '../../commonLogic/filterDefs/actions';
import { useDispatch } from 'react-redux';
import Filters from 'pages/Filters';

const Routing: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTypes());
		dispatch(loadPriorities());
		dispatch(fetchFilterDefs());
	}, [dispatch]);

	return (
		<Switch>
			<PrivateRoute exact path="/createIssue" component={CreateIssue} />
			<PublicRoute exact restricted={true} path="/login" component={Login} />
			<PublicRoute exact restricted={true} path="/header" component={Header} />;
			<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
			<PrivateRoute exact path="/projects" component={Projects} />
			<PrivateRoute exact path="/team/:id" component={Team} />
			<PrivateRoute exact path="/filters" component={Filters} />
		</Switch>
	);
};

export default Routing;
