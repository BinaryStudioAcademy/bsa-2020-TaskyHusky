import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import Team from 'pages/Team';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import ProfilePage from 'containers/ProfilePage';
import CreateIssue from 'pages/CreateIssue';
import Header from 'containers/Header';
import IssuePage from 'pages/IssuePage';
import Filters from 'pages/Filters';
import ProjectsPage from 'pages/ProjectsPage';
import ProjectSettings from 'containers/ProjectSettings';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileTrigger } from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';

const Routing: React.FC = () => {
	const dispatch = useDispatch();
	const profileLoaded = useSelector((state: RootState) => state.auth.profileLoaded);
	const token = useSelector((state: RootState) => state.auth.jwtToken);

	useEffect(() => {
		if (!profileLoaded) {
			dispatch(loadProfileTrigger()); // Must be called before all Routes
		}
	}, [dispatch, profileLoaded, token]);

	if (!profileLoaded) {
		return null;
	}

	return (
		<Switch>
			<PublicRoute exact restricted path="/login" component={Login} />
			<PublicRoute exact restricted path="/signup" component={SignUp} />
			<PrivateRoute exact path="/createIssue" component={CreateIssue} />
			<PrivateRoute path="/issue/:key" component={IssuePage} />
			<PrivateRoute exact path="/header" component={Header} />
			<PrivateRoute exact path="/projects" component={ProjectsPage} />
			<PrivateRoute exact path="/projectSettings" component={ProjectSettings} />
			<PrivateRoute exact path="/team/:id" component={Team} />
			<PublicRoute exact restricted={false} path="/profile/:id" component={ProfilePage} />
			<PrivateRoute exact path="/filters" component={Filters} />
		</Switch>
	);
};

export default Routing;
