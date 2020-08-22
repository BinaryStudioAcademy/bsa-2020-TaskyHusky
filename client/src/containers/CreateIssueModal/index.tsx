import React from 'react';
import CreateIssueModalBody from './body';
import { ContextProvider } from './logic/context';

interface Props {
	children: JSX.Element;
	boardColumnID?: string;
	projectID?: string;
	sprintID?: string;
	onClose?: (data: WebApi.Issue.PartialIssue) => void;
}

const CreateIssueModal: React.FC<Props> = (props) => {
	return (
		<ContextProvider>
			<CreateIssueModalBody {...props}>{props.children}</CreateIssueModalBody>
		</ContextProvider>
	);
};

export default CreateIssueModal;
