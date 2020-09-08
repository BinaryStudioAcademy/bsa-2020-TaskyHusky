import React, { ReactElement } from 'react';
import { Image } from 'semantic-ui-react';
import classNames from 'classnames';
import { defaultAvatarBg } from 'constants/defaultColors';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';

interface Props {
	user: WebApi.Entities.UserProfile;
	small?: boolean;
}

function UserAvatar({ user, small }: Props): ReactElement {
	const avatarStyle = classNames(styles.avatarImage, { [styles.smallIcon]: small });
	return (
		<>
			{user.avatar ? (
				<Image src={user.avatar} className={avatarStyle} circular />
			) : (
				<span className={avatarStyle} style={{ backgroundColor: user.color ?? defaultAvatarBg }}>
					{getInitials(user)}
				</span>
			)}
		</>
	);
}

export default UserAvatar;
