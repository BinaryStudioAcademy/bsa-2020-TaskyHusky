import React from 'react';
import { Pagination, PaginationItemProps } from 'semantic-ui-react';

interface PaginationCI {
	totalPages: number;
	page: number;
	setPage: (skip: number) => void;
}

const PaginationC = ({ totalPages, setPage, page }: PaginationCI) => {
	const handlePaginationChange = (e: React.SyntheticEvent, { activePage }: PaginationItemProps) => {
		setPage(activePage);
	};
	return (
		<Pagination
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

export default PaginationC;
