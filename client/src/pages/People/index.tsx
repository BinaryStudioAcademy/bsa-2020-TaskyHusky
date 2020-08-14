import React, { ReactElement } from 'react';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import People from '../../containers/People';

const PeoplePage: React.FC = (): ReactElement => {
	return (
		<DefaultPageWrapper>
			<People />
		</DefaultPageWrapper>
	);
};

export default PeoplePage;
