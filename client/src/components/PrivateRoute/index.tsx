import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';

interface Props extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
	const { component: Component, ...rest } = props;
	const isAuthorized = Boolean(localStorage.getItem(LocalStorageKeys.SESSION_TOKEN));

	return <Route {...rest} render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
