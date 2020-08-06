import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';

interface Props extends RouteProps {
	restricted: boolean;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = (props: Props) => {
	const { restricted, component: Component, ...rest } = props;
	const isAuthorized = Boolean(localStorage.getItem(LocalStorageKeys.SESSION_TOKEN));

	return (
		<Route
			{...rest}
			render={(props) => (isAuthorized && restricted ? <Redirect to="/" /> : <Component {...props} />)}
		/>
	);
};

export default PublicRoute;
