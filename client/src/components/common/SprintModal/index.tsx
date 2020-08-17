import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

type Props = {
	sprintName: string;
	isOpen: boolean;
	clickAction: any;
};

const SprintModal = (props: Props) => {
	const { sprintName } = props;

	return (
		<Modal basic onClose={props.clickAction} open={props.isOpen} size="small">
			<Header icon>
				<Icon name="trash alternate outline" />
				{`Delete '${sprintName}' sprint`}
			</Header>
			<Modal.Content>
				<p>Are you sure you want to delete this sprint? This action cannot be undone.</p>
			</Modal.Content>
			<Modal.Actions>
				<Button color="red" inverted onClick={props.clickAction}>
					<Icon name="remove" /> No
				</Button>
				<Button basic color="green" inverted onClick={props.clickAction}>
					<Icon name="checkmark" /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SprintModal;
