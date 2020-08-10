import React from 'react';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import ProfileManager from 'components/ProfileManager';
import SecurityManager from 'components/SecurityManager';
import EmailManager from 'components/EmailManager';
import AccountManager from 'components/AccountManager';

interface Props {
	user: UserProfileState;
	showManager: (modeToShow: string) => void;
}

const ProfileManagerSection: React.FC<Props> = (props: Props) => {
	const { user, showManager } = props;
	switch (user.editMode) {
		case 'profile':
			return <ProfileManager />;
		case 'email':
			return <EmailManager />;
		case 'security':
			return <SecurityManager />;
		case 'account':
			return <AccountManager />;
		case 'back':
		default:
			return <>{showManager('')}</>;
	}
};

export default ProfileManagerSection;
