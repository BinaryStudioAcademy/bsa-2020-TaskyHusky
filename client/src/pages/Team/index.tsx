import React from 'react';
import TeamPage from 'containers/TeamPage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const teamPage = ({ match }: { match: any }) => {
	return (
		<DefaultPageWrapper>
			<TeamPage match={match} />
		</DefaultPageWrapper>
	);
};

export default teamPage;
