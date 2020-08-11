import React from 'react';
import CreateIssueModalBody from './body';
import { ContextProvider } from './logic/context';

interface Props {
	children: JSX.Element;
	boardColumnID?: string;
	onClose: () => void;
}

const CreateIssueModal: React.FC<Props> = ({ children, boardColumnID, onClose }) => {
	return (
		<ContextProvider>
			<CreateIssueModalBody onClose={onClose} boardColumnID={boardColumnID}>
				{children}
			</CreateIssueModalBody>
		</ContextProvider>
	);
};

export default CreateIssueModal;
