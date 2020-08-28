/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import styles from 'components/TeamAddPeopleModal/styles.module.scss';
import { useTranslation } from 'react-i18next';
import { User } from './index';
type Props = {
	setShowDelete: (arg: boolean) => void;
	confirm: (arg: string) => void;
	user: User;
};

const RemoveUserModal = ({ setShowDelete, user, confirm }: Props) => {
	const { t } = useTranslation();

	return (
		<Modal onClose={() => setShowDelete(false)} open size="tiny" dimmer="inverted">
			<Modal.Header>
				<span className={styles.title_modal}>
					{`
          ${t('you_are_going_to_remove_user')} ${user?.firstName} ${user?.lastName} ${t('from_team')}
          `}
				</span>
			</Modal.Header>
			<Modal.Content>
				<p className={styles.text_modal}>{t('once_it_happend_he_will_lose_access_to_teamwork')}</p>
				<p className={styles.text_modal}>{t('but_you_can_still_add_him_in_future')}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button basic className={styles.edit_btn} onClick={() => setShowDelete(false)}>
					<span className={styles.edit_btn_value}> {t('cancel')} </span>
				</Button>
				<Button primary onClick={() => confirm(user.id!)}>
					{t('accept')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default RemoveUserModal;
