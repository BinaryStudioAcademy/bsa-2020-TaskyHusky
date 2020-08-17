import React from 'react';
import { Table, Popup } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';

const IssueTable: React.FC = () => {
	const { t } = useTranslation();
	const { issues } = useSelector((rootState: RootState) => rootState.advancedSearch);

	return (
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
	);
};

export default IssueTable;
