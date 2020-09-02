import React from 'react';
import Report from 'containers/Report';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}

const Search: React.FC<Props> = ({ match }) => {
	return (
		<DefaultPageWrapper>
			<Report sprintId={match.params.id} />
		</DefaultPageWrapper>
	);
};

export default Search;
