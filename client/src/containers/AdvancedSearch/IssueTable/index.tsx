import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import Pagination from '../../../components/common/Pagination';
import { loadIssues } from '../logic/actions';
import styles from './styles.module.scss';
import HeaderCell from 'components/AdvancedSearch/HeaderCell';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

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
	| 'type'
	| 'issueKey'
	| 'summary'
	| 'assigned'
	| 'creator'
	| 'priority'
	| 'status'
	| 'createdAt'
	| 'updatedAt';

interface HandleSortI {
	field: SortByProp;
}

const columns: SortByProp[] = [
	'type',
	'issueKey',
	'summary',
	'assigned',
	'creator',
	'priority',
	'status',
	'createdAt',
	'updatedAt',
];

const IssueTable: React.FC = () => {
	const dispatch = useDispatch();
	const { issues, issuesCount } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [page, setPage] = useState(1);
	const { t } = useTranslation();
	const { filterId } = useParams();

	const [sort, setSort] = useState<Sort>({});

	useEffect(() => {
		const from = PAGE_SIZE * (page - 1);
		const to = PAGE_SIZE * page;
		if (!filterId) {
			dispatch(loadIssues({ from, to, sort }));
		}
	}, [dispatch, page, sort, filterId]);

	const handleSort = ({ field }: HandleSortI) => {
		const sortBy = sort[field];
		setSort({ [field]: !!sortBy && sortBy === 'DESC' ? 'ASC' : 'DESC' });
	};

	return (
		<>
			<span>{`1-${issues.length} ${t('of')} ${issuesCount}`}</span>
			<Table selectable compact sortable>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.HeaderCell
								key={`${column}`}
								onClick={() => handleSort({ field: column })}
								className={styles.headerCell}
							>
								<HeaderCell sort={sort} name={column} />
							</Table.HeaderCell>
						))}
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
