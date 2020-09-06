import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Team from 'pages/Team';
import Profile from 'pages/Profile';
import PublicRoute from 'components/PublicRoute';
import Filters from 'pages/Filters';
import IssuePage from 'pages/IssuePage';
import ProjectsPage from 'pages/ProjectsPage';
import ProjectSettings from 'pages/ProjectSettings';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileTrigger } from 'containers/LoginPage/logic/actions';
import { RootState } from 'typings/rootState';
import BoardsPage from '../../pages/Boards';
import PeoplePage from '../../pages/People';
import BoardPage from 'pages/BoardPage';
import ProjectIssues from 'pages/ProjectIssues';
import NotFound from 'pages/404';
import Search from 'pages/AdvancedSearch';
import Work from 'pages/Work';
import ResetPassword from '../ResetPassword';
import ForgotPassword from '../ForgotPassword';
import ResetEmail from '../ResetEmail';
import Landing from 'pages/LandingPage';
import Spinner from 'components/common/Spinner';
import ColumnsSettings from 'pages/ColumnsSettings';

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
		return <Spinner />;
	}

	return (
		<Switch>
			<PublicRoute restricted exact path={['/', '/login', '/signup']} component={Landing} />
			<PublicRoute exact restricted path="/forgot-password" component={ForgotPassword} />
			<Route exact path="/reset-password/:token" component={ResetPassword} />
			<PrivateRoute path="/reset-email/:token/:emailBtoa" component={ResetEmail} />
			<PrivateRoute path="/issue/:key" component={IssuePage} />
			<PrivateRoute exact path="/projects" component={ProjectsPage} />
			<PrivateRoute exact path="/my-work" component={Work} />
			<PrivateRoute exact path="/projects/projectSettings/:id/:section" component={ProjectSettings} />
			<PrivateRoute exact path="/team/:id" component={Team} />
			<PrivateRoute exact path="/profile/:id" component={Profile} />
			<PrivateRoute exact path="/filters" component={Filters} />
			<PrivateRoute exact path="/board/:boardId/columnsSettings" component={ColumnsSettings} />
			<PrivateRoute path="/board/:id" component={BoardPage} />
			<PrivateRoute path="/project/:id/issues" component={ProjectIssues} />
			<PrivateRoute exact path="/people" component={PeoplePage} />
			<PrivateRoute path="/advancedSearch/:filterId" component={Search} />
			<PrivateRoute exact path="/advancedSearch" component={Search} />
			<PrivateRoute exact path="/boards" component={BoardsPage} />
			<PublicRoute restricted={false} path="*" component={NotFound} />
		</Switch>
	);
};

export default Routing;
