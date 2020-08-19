import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItemProps } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface PaginationCI {
	totalPages: number;
	loadOnChangePage: (page: number) => void;
}

const PaginationC = ({ totalPages, loadOnChangePage }: PaginationCI) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [page, setPage] = useState(1);

	useEffect(() => {
		loadOnChangePage(page);
	}, [dispatch, page, loadOnChangePage]);

	const handlePaginationChange = (e: React.SyntheticEvent, { activePage }: PaginationItemProps) => {
		setPage(activePage);
		const pathname = location.pathname;

		if (activePage === 1) {
			history.push(`${pathname}`);
		} else {
			history.push(`${pathname}?page=${activePage}`);
		}
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
