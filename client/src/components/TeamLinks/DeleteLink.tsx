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
		<Modal onClose={onClose} dimmer="inverted" open size="tiny">
			<Modal.Header>{t('delete_link')}</Modal.Header>
			<Modal.Content>
				<p className={styles.linkDescription}>
					{t('link_to')} <span className={styles.linkTitle}>{link.name}</span>{' '}
					{t('will_be_deleted_from_section')}
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={t('accept')}
					className={styles.editBtn}
					labelPosition="left"
					icon="checkmark"
					onClick={() => onDelete(link)}
				/>
				<Button className={styles.cancelBtn} onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteLink;
