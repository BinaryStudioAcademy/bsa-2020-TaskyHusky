import React from 'react';
import Report from 'containers/Report';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			sprintId: string;
		};
	};
}

const Search: React.FC<Props> = ({ match }) => {
	return (
		<DefaultPageWrapper>
			<Report sprintId={match.params.sprintId} />
		</DefaultPageWrapper>
	);
};

export default Search;
