import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'containers/Board/Scrum/logic/actions';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';

type Props = {
	sprintName: string;
	sprintId: string;
	isOpen: boolean;
	clickAction: any;
	sprintIssues: any;
};

const SprintModal = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { sprintName, sprintId, sprintIssues } = props;

	const handleNoButtonClick = () => {
		props.clickAction();
	};

	const handleYesButtonClick = () => {
		if (sprintIssues.length > 0) {
			NotificationManager.error(t('sprint_cannot_be_deleted'), 'Error');
		}

		if (sprintIssues.length === 0) {
			dispatch(actions.deleteSprintTrigger({ sprintId }));
		}

		props.clickAction();
	};

	return (
		<Modal basic onClose={props.clickAction} open={props.isOpen} size="small">
			<Header icon>
				<Icon name="trash alternate outline" />
				{`${t('delete_sprint')} - '${sprintName}'`}
			</Header>
			<Modal.Content>
				<p>{t('delete_sprint_warning')}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button color="red" inverted onClick={handleNoButtonClick}>
					<Icon name="remove" /> {t('cancel')}
				</Button>
				<Button basic color="green" inverted onClick={handleYesButtonClick}>
					<Icon name="checkmark" /> {t('delete')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SprintModal;
