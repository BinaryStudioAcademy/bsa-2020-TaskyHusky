import React from 'react';
import styles from './styles.module.scss';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { requestDeleteUser } from 'containers/ProfilePage/logiс/actions';
import { useDispatch } from 'react-redux';
import LanguageSelect from 'components/LanguageSelect';
import { useTranslation } from 'react-i18next';

const AccountManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const DeleteUser = () => {
		dispatch(requestDeleteUser(null));
	};
	return (
		<section className={styles.container}>
			<Header as="h3">{t('acc_pref')}</Header>
			<div className={styles.card}>
				<p>{t('ctrl_settings')}</p>
				<Header as="h4">{t('lang_reg')}</Header>
				<p>
					{t('content_lang')}
					<Link to="#">{t('product_settings')}</Link>.
				</p>
				<LanguageSelect />
				<Header as="h4">{t('del_acc')}</Header>
				<p>{t('content_del')}</p>
				<div className={styles.footer}>
					<Button className={styles.footer__button} onClick={DeleteUser}>
						{t('del_btn')}
					</Button>
					<Link to="#" className={styles.footer__link}>
						{t('learn_more')}
						<Icon className={styles.footer__icon} disabled name="external alternate" size="small" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default AccountManager;
