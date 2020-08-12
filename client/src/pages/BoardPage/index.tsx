import React from 'react';
import Board from 'containers/Board';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}

const BoardPage: React.FC<Props> = ({ match }) => {
	return (
		<DefaultPageWrapper>
			<Board boardId={match.params.id} />
		</DefaultPageWrapper>
	);
};

export default BoardPage;
