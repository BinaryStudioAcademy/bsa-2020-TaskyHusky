import React from 'react';
import styles from './styles.module.scss';
import { Image } from 'semantic-ui-react';
import { getInitials } from 'helpers/getInitials.helper';
import { getUsername } from 'helpers/getUsername.helper';
import { User } from 'containers/LoginPage/logic/state';
import { useTranslation } from 'react-i18next';

type Props = {
	user: User | WebApi.Entities.UserProfile | undefined;
};

const AssigneeAvatar = (props: Props): JSX.Element | null => {
	const { user } = props;
	const { t } = useTranslation();

	return user ? (
		user.avatar ? (
			<Image avatar src={user?.avatar} title={`${t('assigned')}: ${getUsername(user)}`} />
		) : (
			<Image avatar className={styles.avatar} title={`${t('assigned')}: ${getUsername(user)}`}>
				{getInitials(user)}
			</Image>
		)
	) : null;
};

export default AssigneeAvatar;
