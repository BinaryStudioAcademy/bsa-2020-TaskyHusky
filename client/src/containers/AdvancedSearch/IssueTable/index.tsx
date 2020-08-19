import React, { useCallback } from 'react';
import { Table, Popup } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';
import PaginationC from '../../../components/common/Pagination';
import { useLocation } from 'react-router-dom';

import { loadIssues } from '../logic/actions';

const IssueTable: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { issues, issuesCount } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const takeOption = 25;

	const query = new URLSearchParams(useLocation().search);
	const queryPage = query.get('page');
	const page = Number(queryPage === null ? 1 : queryPage);

	const memoF = useCallback(() => {
		dispatch(loadIssues({ page }));
	}, [dispatch, page]);

	return (
		<>
			<span>{`1-${issues.length} of ${issuesCount}`}</span>
			<Table selectable compact>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>
							<Popup content={t('type')} trigger={<div style={{ paddingLeft: '6px' }}>T</div>} />
						</Table.HeaderCell>
						<Table.HeaderCell>{t('key')}</Table.HeaderCell>
						<Table.HeaderCell>{t('summary')}</Table.HeaderCell>
						<Table.HeaderCell>{t('assignee')}</Table.HeaderCell>
						<Table.HeaderCell>{t('reporter')}</Table.HeaderCell>
						<Table.HeaderCell>
							<Popup content={t('priority')} trigger={<div style={{ paddingLeft: '6px' }}>P</div>} />
						</Table.HeaderCell>
						<Table.HeaderCell>{t('status')}</Table.HeaderCell>
						<Table.HeaderCell>Created</Table.HeaderCell>
						<Table.HeaderCell>Updated</Table.HeaderCell>
						<Table.HeaderCell> </Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues.map((issue) => (
						<IssueItem key={issue.id} issue={issue} />
					))}
				</Table.Body>
			</Table>
			<PaginationC totalPages={Math.ceil(issuesCount / takeOption)} loadOnChangePage={memoF} />
		</>
	);
};

export default IssueTable;
