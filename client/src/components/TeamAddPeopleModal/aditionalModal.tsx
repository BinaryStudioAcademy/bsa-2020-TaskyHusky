import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
	setShowDelete: (arg: boolean) => void;
};

const AditionalModal = ({ setShowDelete }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal onClose={() => setShowDelete(false)} open size="tiny" dimmer="inverted">
			<Modal.Header>
				<span className={styles.title_modal}>{t('you_are_going_to_delete_team')}</span>
			</Modal.Header>
			<Modal.Content>
				<p className={styles.text_modal}>{t('deleting_will_destroy_information')}</p>
				<p className={styles.text_modal}>{t('deleting_team_cannot_be_prevented')}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button basic className={styles.edit_btn} onClick={() => setShowDelete(false)}>
					<span className={styles.edit_btn_value}> {t('cancel')} </span>
				</Button>
				<Button icon="check" primary onClick={() => console.log('deleted')}>
					{t('Im_sure')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default AditionalModal;
