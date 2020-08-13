import React from 'react';
import styles from './styles.module.scss';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { requestDeleteUser } from 'containers/ProfilePage/logiс/actions';
import { useDispatch } from 'react-redux';
import LanguageSelect from 'components/LanguageSelect';

const AccountManager = () => {
	const dispatch = useDispatch();
	const DeleteUser = () => {
		dispatch(requestDeleteUser(null));
	};
	return (
		<section className={styles.container}>
			<Header as="h3">Account preferences</Header>
			<p>Control settings related to your account.</p>
			<Header as="h4">Language &#65120; Region</Header>
			<p>
				Changes to your language and timezone will be reflected across Confluence, Jira and directory. Update
				your language and timezone for other products from your <Link to="#">product settings</Link>.
			</p>
			<LanguageSelect />
			<Header as="h4">Delete your account</Header>
			<p>
				When you delete your account, you lose access to Atlassian account services, and we permanently delete
				your personal data. You can cancel the deletion for 14 days. This page is protected by reCAPTCHA and the
				Google Privacy Policy and Terms of Service apply.
			</p>
			<div className={styles.footer}>
				<Button className={styles.footer__button} onClick={DeleteUser}>
					Delete account
				</Button>
				<Link to="#" className={styles.footer__link}>
					Learn more
					<Icon className={styles.footer__icon} disabled name="external alternate" size="small" />
				</Link>
			</div>
		</section>
	);
};

export default AccountManager;
