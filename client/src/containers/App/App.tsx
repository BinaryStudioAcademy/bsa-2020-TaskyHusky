import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history.helper';
import store from 'redux/store';
import Routing from 'containers/Routing';
import { NotificationContainer } from 'react-notifications';
import ErrorBoundary from 'components/ErrorBoundary';

const App: React.FC = () => {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<NotificationContainer />
				<Router history={history}>
					<Routing />
				</Router>
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
