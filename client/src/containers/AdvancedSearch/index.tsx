import React from 'react';
import styles from './styles.module.scss';
import AdvancedFilters from 'containers/AdvancedSearch/AdvancedFilters';
import SearchTitle from '../../components/SearchTitle';
import IssueTable from './IssueTable';

const AdvancedSearch: React.FC = () => {
	return (
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<SearchTitle />
				<AdvancedFilters />
			</div>
			<IssueTable />
		</div>
	);
};

export default AdvancedSearch;
