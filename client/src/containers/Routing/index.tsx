import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import Login from 'pages/Login';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'pages/SignUp';
import PrivateRoute from 'components/PrivateRoute';
import CreateIssueModal from 'containers/CreateIssueModal';
import { ControlsGetter } from 'containers/CreateIssueModal/logic/types';
import { Button } from 'semantic-ui-react';

const Routing: React.FC = () => (
	<Switch>
		<PrivateRoute exact path="/" component={Example} />
		<PrivateRoute
			exact
			path="/addIssue"
			component={() => {
				let openModal: () => void, closeModal: () => void;

				const getSetters: ControlsGetter = (open, close) => {
					openModal = open;
					closeModal = close;
				};

				return (
					<>
						<Button fluid positive onClick={() => openModal()}>
							Open
						</Button>
						<CreateIssueModal>{getSetters}</CreateIssueModal>
					</>
				);
			}}
		/>
		<PublicRoute exact restricted={true} path="/login" component={Login} />
		<PublicRoute exact restricted={true} path="/signup" component={SignUp} />
	</Switch>
);

export default Routing;
