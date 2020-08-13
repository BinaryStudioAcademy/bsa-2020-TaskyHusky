import React from 'react';
import TeamPage from 'containers/TeamPage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Match {
	params: { [key: string]: string };
	isExact: boolean;
	path: string;
	url: string;
}

const teamPage = ({ match }: { match: Match }) => {
	return (
		<DefaultPageWrapper>
			<TeamPage match={match} />
		</DefaultPageWrapper>
	);
};

export default teamPage;
