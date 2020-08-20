import React, { useState, useEffect } from 'react';
import { Table, Popup, Icon } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';
import PaginationC from '../../../components/common/Pagination';
import { loadIssues } from '../logic/actions';
import styles from './styles.module.scss';

const PAGE_SIZE = 25;

export type Sort = {
	summary?: 'DESC' | 'ASC' | undefined;
	assigned?: 'DESC' | 'ASC' | undefined;
	creator?: 'DESC' | 'ASC' | undefined;
	type?: 'DESC' | 'ASC' | undefined;
	priority?: 'DESC' | 'ASC' | undefined;
	status?: 'DESC' | 'ASC' | undefined;
	issueKey?: 'DESC' | 'ASC' | undefined;
	createdAt?: 'DESC' | 'ASC' | undefined;
	updatedAt?: 'DESC' | 'ASC' | undefined;
};

interface HandleSortI {
	by: 'summary' | 'assigned' | 'creator' | 'type' | 'priority' | 'createdAt' | 'updatedAt' | 'issueKey' | 'status';
}

interface HeaderCellCI {
	name: 'summary' | 'assigned' | 'creator' | 'type' | 'priority' | 'createdAt' | 'updatedAt' | 'issueKey' | 'status';
	popup?: boolean;
	text?: string;
}

const IssueTable: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
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

	const HeaderCellC = ({ name, popup, text }: HeaderCellCI) => {
		return (
			<>
				{popup ? (
					<Popup
						content={t(name)}
						trigger={
							<div style={{ paddingLeft: '6px' }}>
								{text}
								{sort[name] && (
									<Icon size="small" name={sort[name] === 'DESC' ? 'arrow down' : 'arrow up'} />
								)}
							</div>
						}
					/>
				) : (
					<div>
						{t(name)}
						{sort[name] && <Icon size="small" name={sort[name] === 'DESC' ? 'arrow down' : 'arrow up'} />}
					</div>
				)}
			</>
		);
	};
	return (
		<>
			<span>{`1-${issues.length} of ${issuesCount}`}</span>
			<Table selectable compact sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell onClick={() => handleSort({ by: 'type' })} className={styles.headerCell}>
							<HeaderCellC name={'type'} popup={true} text={'T'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'issueKey' })} className={styles.headerCell}>
							<HeaderCellC name={'issueKey'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'summary' })} className={styles.headerCell}>
							<HeaderCellC name={'summary'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'assigned' })} className={styles.headerCell}>
							<HeaderCellC name={'assigned'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'creator' })} className={styles.headerCell}>
							<HeaderCellC name={'creator'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'priority' })} className={styles.headerCell}>
							<HeaderCellC name={'priority'} popup={true} text={'P'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'status' })} className={styles.headerCell}>
							<HeaderCellC name={'status'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'createdAt' })} className={styles.headerCell}>
							<HeaderCellC name={'createdAt'} />
						</Table.HeaderCell>
						<Table.HeaderCell onClick={() => handleSort({ by: 'updatedAt' })} className={styles.headerCell}>
							<HeaderCellC name={'updatedAt'} />
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
			<PaginationC totalPages={Math.ceil(issuesCount / PAGE_SIZE)} page={page} setPage={setPage} />
		</>
	);
};

export default IssueTable;
