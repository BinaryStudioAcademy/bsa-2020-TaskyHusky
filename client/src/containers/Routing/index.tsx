import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/LogIn';
import Team from 'pages/Team';
import Profile from 'pages/Profile';
import CreateTeamModal from 'components/CreateTeamModal';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import Filters from 'pages/Filters';
import IssuePage from 'pages/IssuePage';
import ProjectsPage from 'pages/ProjectsPage';
import ProjectSettings from 'pages/ProjectSettings';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileTrigger } from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';
import BoardsPage from '../../pages/Boards';
import BoardPage from 'pages/BoardPage';
import ProjectIssues from 'pages/ProjectIssues';
import NotFound from 'pages/404';
import Search from 'pages/AdvancedSearch';

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
			<PrivateRoute path="/issue/:key" component={IssuePage} />
			<PrivateRoute exact path="/projects" component={ProjectsPage} />
			<PrivateRoute exact path="/projects/projectSettings/:id" component={ProjectSettings} />
			<PrivateRoute exact path="/team/:id" component={Team} />
			<PrivateRoute exact path="/profile/:id" component={Profile} />
			<PrivateRoute exact path="/team" component={CreateTeamModal} />
			<PrivateRoute exact path="/filters" component={Filters} />
			<PrivateRoute path="/board/:id" component={BoardPage} />
			<PrivateRoute path="/project/:id/issues" component={ProjectIssues} />
			<PrivateRoute exact path="/advancedSearch" component={Search} />
			<PublicRoute restricted={false} path="*" component={NotFound} />
			<PrivateRoute exact path="/boards" component={BoardsPage} />
		</Switch>
	);
};

export default Routing;
