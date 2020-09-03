import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { removeToken } from 'helpers/setToken.helper';
import { logOutUserTrigger } from 'containers/LoginPage/logic/actions';
import { requestDeleteUser } from 'containers/ProfilePage/logiс/actions';
import { useDispatch } from 'react-redux';
import LanguageSelect from 'components/LanguageSelect';
import { useTranslation } from 'react-i18next';
import DeleteUserModal from 'components/DeleteUserModal';

const AccountManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [isDelete, setIsDelete] = useState(false);

	const toggleModal = () => setIsDelete(!isDelete);

	const onClose = () => {
		toggleModal();
	};

	const showDeleteModal = () => {
		toggleModal();
	};

	const deleteUser = () => {
		dispatch(requestDeleteUser(null));
		dispatch(logOutUserTrigger());
		removeToken();
	};

	return (
		<section className={styles.container}>
			{isDelete && <DeleteUserModal onClose={onClose} deleteUser={deleteUser} />}
			<h3 className={styles.header}>{t('acc_pref')}</h3>
			<div className={styles.card}>
				<p className={styles.textData}>{t('ctrl_settings')}</p>
				<h4 className={styles.cardHeader}>{t('lang_reg')}</h4>
				<p className={styles.textData}>{t('content_lang')}</p>
				<LanguageSelect />
				<h4 className={styles.cardHeader}>{t('del_acc')}</h4>
				<p className={styles.textData}>{t('content_del')}</p>
				<div className={styles.footer}>
					<Button className={styles.footerButton} onClick={showDeleteModal}>
						{t('del_btn')}
					</Button>
					<Link to="#" className={styles.footerLink}>
						{t('learn_more')}
						<Icon className={styles.footerIcon} disabled name="external alternate" size="small" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default AccountManager;
