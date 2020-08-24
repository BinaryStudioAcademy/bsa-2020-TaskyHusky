import React, { ReactElement } from 'react';
import { Image } from 'semantic-ui-react';

import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';

interface Props {
	user: WebApi.Entities.UserProfile;
	small?: boolean;
}

function UserAvatar({ user, small }: Props): ReactElement {
	return (
		<>
			{user.avatar ? (
				<Image src={user.avatar} className={[small && styles.small, styles.avatarImage].join(' ')} circular />
			) : (
				<span className={[small && styles.small, styles.avatar].join(' ')}>{getInitials(user)}</span>
			)}
		</>
	);
}

export default UserAvatar;
