import React, { useEffect } from 'react';
import { ControlsGetter } from 'containers/CreateIssueModal/logic/types';
import CreateIssueModal from 'containers/CreateIssueModal';
import { Grid } from 'semantic-ui-react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const CreateIssueExamplePage: React.FC = () => {
	let openModal: (() => void) | undefined;

	const getControls: ControlsGetter = (open) => {
		openModal = open;
	};

	useEffect(() => {
		if (openModal) {
			openModal();
		}
	}, [openModal]);

	return (
		<DefaultPageWrapper>
			<Grid textAlign="center" verticalAlign="middle" className="fill" columns="1">
				<Grid.Column style={{ maxWidth: 500 }}>
					<CreateIssueModal>{getControls}</CreateIssueModal>
				</Grid.Column>
			</Grid>
		</DefaultPageWrapper>
	);
};

export default CreateIssueExamplePage;
