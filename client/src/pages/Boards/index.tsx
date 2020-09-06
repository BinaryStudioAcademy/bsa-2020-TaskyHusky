import React from 'react';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import Boards from '../../containers/Boards';

const BoardsPage: React.FC = () => {
	return (
		<DefaultPageWrapper isOverflowHidden={true}>
			<Boards />
		</DefaultPageWrapper>
	);
};

export default BoardsPage;
