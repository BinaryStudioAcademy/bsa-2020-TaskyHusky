import React from 'react';
import { Pagination as SemanticPagination, PaginationItemProps } from 'semantic-ui-react';

interface PaginationCI {
	totalPages: number;
	page: number;
	setPage: (skip: number) => void;
}

const Pagination = ({ totalPages, setPage, page }: PaginationCI) => {
	const handlePaginationChange = (e: React.SyntheticEvent, { activePage }: PaginationItemProps) => {
		setPage(activePage);
	};
	return (
		<SemanticPagination
			style={{ maxWidth: 'max-content' }}
			defaultActivePage={1}
			boundaryRange={1}
			onPageChange={handlePaginationChange}
			size="mini"
			siblingRange={1}
			totalPages={totalPages}
			ellipsisItem={undefined}
			firstItem={null}
			lastItem={null}
		/>
	);
};

export default Pagination;
