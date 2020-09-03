import React from 'react';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import ProfileManager from 'components/ProfileManager';
import SecurityManager from 'components/SecurityManager';
import EmailManager from 'components/EmailManager';
import AccountManager from 'components/AccountManager';
import { ModeManager } from 'containers/ProfilePage';

interface Props {
	user: UserProfileState;
	editMode: string;
	showManager: (modeToShow: ModeManager) => void;
	updateUser: (changedUser: Partial<UserProfileState>) => void;
}

const ProfileManagerSection: React.FC<Props> = (props: Props) => {
	const { user, showManager, updateUser, editMode } = props;
	switch (editMode) {
		case ModeManager.profile:
			return <ProfileManager showManager={showManager} updateUser={updateUser} user={user} />;
		case ModeManager.email:
			return <EmailManager />;
		case ModeManager.security:
			return <SecurityManager />;
		case ModeManager.account:
			return <AccountManager />;
		case ModeManager.main:
		default:
			return <>{showManager(ModeManager.main)}</>;
	}
};

export default ProfileManagerSection;
