import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
	setShowDelete: (arg: boolean) => void;
};

const AditionalModal = ({ setShowDelete }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal onClose={() => setShowDelete(false)} open size="tiny" dimmer="blurring">
			<Modal.Header>
				<Icon name="warning circle" size="large" color="red" />
				<span className={styles.title_modal}>{t('you_are_going_to_delete_team')}</span>
			</Modal.Header>
			<Modal.Content>
				<p className={styles.text_modal}>{t('deleting_will_destroy_information')}</p>
				<p className={styles.text_modal}>{t('deleting_team_cannot_be_prevented')}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button content={t('cancel')} onClick={() => setShowDelete(false)}></Button>
				<Button icon="check" className={styles.delete_btn} basic onClick={() => console.log('deleted')}>
					<span className={styles.delete_btn_value}> {t('Im_sure')}</span>
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default AditionalModal;
