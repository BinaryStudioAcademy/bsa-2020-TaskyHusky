import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';
import { useTranslation } from 'react-i18next';

type Props = {
	onClose: () => void;
	link: CurrentLink;
	onDelete: (arg: CurrentLink) => void;
};

const DeleteLink = ({ onClose, link, onDelete }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal onClose={onClose} open size="tiny">
			<Modal.Header className="standartHeader">{t('delete_link')}</Modal.Header>
			<Modal.Content>
				<p className="textData">
					{t('link_to')} <span className={styles.linkTitle}>{link.name}</span>{' '}
					{t('will_be_deleted_from_section')}
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={t('accept')}
					className="primaryBtn"
					labelPosition="left"
					icon="checkmark"
					onClick={() => onDelete(link)}
				/>
				<Button className="cancelBtn" onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteLink;
