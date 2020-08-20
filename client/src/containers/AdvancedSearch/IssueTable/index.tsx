import React, { useState, useEffect } from 'react';
import { Table, Popup } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';
import PaginationC from '../../../components/common/Pagination';
import { loadIssues } from '../logic/actions';

const PAGE_SIZE = 25;
export type Sort = {
	summary?: 'DESC' | 'ASC' | undefined;
	assignee?: 'DESC' | 'ASC' | undefined;
	creator?: 'DESC' | 'ASC' | undefined;
	type?: 'DESC' | 'ASC' | undefined;
	priority?: 'DESC' | 'ASC' | undefined;
	status?: 'DESC' | 'ASC' | undefined;
	issueKey?: 'DESC' | 'ASC' | undefined;
	createdAt?: 'DESC' | 'ASC' | undefined;
	updatedAt?: 'DESC' | 'ASC' | undefined;
};

interface HandleSortI {
	by: 'summary' | 'assignee' | 'creator' | 'type' | 'priority' | 'createdAt' | 'updatedAt' | 'issueKey' | 'status';
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
			setSort({ [by]: 'ASC' });
		} else {
			setSort({ [by]: sortBy === 'DESC' ? 'ASC' : 'DESC' });
		}
		console.log(sort);
	};

	return (
		<>
			<span>{`1-${issues.length} of ${issuesCount}`}</span>
			<Table selectable compact>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>
							<Popup
								content={t('type')}
								trigger={
									<div onClick={() => handleSort({ by: 'type' })} style={{ paddingLeft: '6px' }}>
										T
									</div>
								}
							/>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'issueKey' })}>{t('key')}</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'summary' })}>{t('summary')}</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'assignee' })}>{t('assignee')}</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'creator' })}>{t('creator')}</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<Popup
								content={t('priority')}
								trigger={
									<div onClick={() => handleSort({ by: 'priority' })} style={{ paddingLeft: '6px' }}>
										P
									</div>
								}
							/>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'status' })}>{t('status')}</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'createdAt' })}>Created</div>
						</Table.HeaderCell>
						<Table.HeaderCell>
							<div onClick={() => handleSort({ by: 'updatedAt' })}>Updated</div>
						</Table.HeaderCell>
						<Table.HeaderCell> </Table.HeaderCell>
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
