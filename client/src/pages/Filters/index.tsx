import React from 'react';
import Filters from '../../containers/Filters';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

const FiltersPage: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<Filters />
		</DefaultPageWrapper>
	);
};

export default FiltersPage;
