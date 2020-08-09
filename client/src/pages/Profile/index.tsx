import React from 'react';
import ProfilePage from 'containers/ProfilePage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const profilePage = ({ match: { params } }: { match: any }) => {
	return (
		<DefaultPageWrapper>
			<ProfilePage id={params.id} />
		</DefaultPageWrapper>
	);
};

export default profilePage;
