import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { RootState } from 'typings/rootState';
import { NotificationManager } from 'react-notifications';

type Props = {
	sprintName: string;
	sprintId: string;
	isOpen: boolean;
	clickAction: any;
	sprintIssues: any;
};

const SprintModal = (props: Props) => {
	const dispatch = useDispatch();
	const scrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);
	const { sprintName, sprintId, sprintIssues } = props;

	const handleNoButtonClick = () => {
		props.clickAction();
	};

	const handleYesButtonClick = () => {
		if (sprintIssues.length > 0) {
			NotificationManager.error('Sprint cannot be deleted', 'Error');
		}

		if (sprintIssues.length === 0) {
			dispatch(actions.deleteSprintTrigger({ sprintId }));
			// dispatch(actions.loadSprintsTrigger({ boardId: scrumBoardState.sprints[0].board?.id as string })); // WILL BE REFACTORED
		}

		props.clickAction();
	};

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
				<Button color="red" inverted onClick={handleNoButtonClick}>
					<Icon name="remove" /> No
				</Button>
				<Button basic color="green" inverted onClick={handleYesButtonClick}>
					<Icon name="checkmark" /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SprintModal;
