import React from 'react';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import ContentInput from 'components/ContentInput';

interface Props {
	data: {
		text: string;
		name: string;
		isCurrentUser: boolean;
	};
}
const ProfileAboutItem: React.FC<Props> = (props: Props) => {
	const {
		data: { text, isCurrentUser, name },
	} = props;
	return (
		<div className={styles.container}>
			<Icon disabled name="briefcase" size="large" />
			{text ? (
				<ContentInput
					isCurrentUser={isCurrentUser}
					contentData={{ text, defaultContent: false, name }}
				></ContentInput>
			) : (
				<ContentInput
					isCurrentUser={isCurrentUser}
					contentData={{ text: 'Your job title', defaultContent: true, name }}
				/>
			)}
		</div>
	);
};

export default ProfileAboutItem;
