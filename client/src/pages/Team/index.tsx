import React from 'react';
import { TeamPage } from 'containers/TeamPage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const teamPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<TeamPage />
		</DefaultPageWrapper>
	);
};

export default teamPage;
