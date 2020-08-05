import React from 'react';
import { ControlsGetter } from './logic/types';
import CreateIssueModal from '.';
import { Button } from 'semantic-ui-react';

const CreateIssueExamplePage: React.FC = () => {
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
};

export default CreateIssueExamplePage;
