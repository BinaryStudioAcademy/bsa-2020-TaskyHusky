import React from 'react';
import AdvancedSearch from '../../containers/AdvancedSearch';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const Search: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<AdvancedSearch />
		</DefaultPageWrapper>
	);
};

export default Search;
