import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import * as actions from 'containers/Filters/logic/actions';
import { useTranslation } from 'react-i18next';

interface Props {
	filter: WebApi.Entities.Filter;
	onClose: () => void;
}

const DeleteBoardModal: React.FC<Props> = (props) => {
	const { filter, onClose } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleDelete = () => {
		dispatch(actions.deleteFilter({ id: filter.id }));
		onClose();
	};

	return (
		<Modal onClose={() => onClose()} open={true} size="tiny" dimmer="inverted">
			<Modal.Header>{`${t('delete')} ${filter.name}`}</Modal.Header>
			<Modal.Content>{t('delete_filter_modal_text')}</Modal.Content>
			<Modal.Actions>
				<Button className="contentBtn" onClick={handleDelete}>
					{t('delete')}
				</Button>
				<Button className="cancelBtn" onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteBoardModal;
