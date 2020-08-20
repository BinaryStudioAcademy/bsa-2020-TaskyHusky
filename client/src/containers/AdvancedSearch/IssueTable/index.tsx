import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import Pagination from '../../../components/common/Pagination';
import { loadIssues } from '../logic/actions';
import styles from './styles.module.scss';
import HeaderCell from 'components/AdvancedSearch/HeaderCell';

const PAGE_SIZE = 25;
type SortDir = 'DESC' | 'ASC';

export type Sort = {
	summary?: SortDir;
	assigned?: SortDir;
	creator?: SortDir;
	type?: SortDir;
	priority?: SortDir;
	status?: SortDir;
	issueKey?: SortDir;
	createdAt?: SortDir;
	updatedAt?: SortDir;
};

export type SortByProp =
	| 'summary'
	| 'assigned'
	| 'creator'
	| 'type'
	| 'priority'
	| 'createdAt'
	| 'updatedAt'
	| 'issueKey'
	| 'status';

interface HandleSortI {
	by: SortByProp;
}

const IssueTable: React.FC = () => {
	const dispatch = useDispatch();
	const { issues, issuesCount } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [page, setPage] = useState(1);

	const [sort, setSort] = useState<Sort>({});

	useEffect(() => {
		const from = PAGE_SIZE * (page - 1);
		const to = PAGE_SIZE * page;
		dispatch(loadIssues({ from, to, sort }));
	}, [dispatch, page, sort]);

	const handleSort = ({ by }: HandleSortI) => {
		const sortBy = sort[by];
		if (!sortBy) {
			setSort({ [by]: 'DESC' });
		} else {
			setSort({ [by]: sortBy === 'DESC' ? 'ASC' : 'DESC' });
		}
	};

	return (
		<>
			<span>{`1-${issues.length} of ${issuesCount}`}</span>
			<Table selectable compact sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell onClick={() => handleSort({ by: 'type' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'type'} popup={true} text={'T'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'issueKey' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'issueKey'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'summary' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'summary'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'assigned' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'assigned'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'creator' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'creator'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'priority' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'priority'} popup={true} text={'P'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'status' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'status'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'createdAt' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'createdAt'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'updatedAt' })} className={styles.headerCell}>
							<HeaderCell sort={sort} name={'updatedAt'} />
						</Table.HeaderCell>
						<Table.HeaderCell className={styles.headerCell}> </Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues.map((issue) => (
						<IssueItem key={issue.id} issue={issue} />
					))}
				</Table.Body>
			</Table>
			<Pagination totalPages={Math.ceil(issuesCount / PAGE_SIZE)} page={page} setPage={setPage} />
		</>
	);
};

export default IssueTable;
