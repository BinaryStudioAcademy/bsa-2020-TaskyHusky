import React from 'react';
import styles from './styles.module.scss';
import { Button, Icon } from 'semantic-ui-react';
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
			<h3 className={styles.header}>{t('acc_pref')}</h3>
			<div className={styles.card}>
				<p className={styles.card__textData}>{t('ctrl_settings')}</p>
				<h4 className={styles.card__header}>{t('lang_reg')}</h4>
				<p className={styles.card__textData}>
					{t('content_lang')}
					<Link to="#">{t('product_settings')}</Link>.
				</p>
				<LanguageSelect />
				<h4 className={styles.card__header}>{t('del_acc')}</h4>
				<p className={styles.card__textData}>{t('content_del')}</p>
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
