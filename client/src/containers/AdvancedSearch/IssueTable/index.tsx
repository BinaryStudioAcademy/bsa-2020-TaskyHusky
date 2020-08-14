import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { loadIssues } from 'containers/AdvancedSearch/logic/actions';

const IssueTable: React.FC = () => {
	const dispatch = useDispatch();
	const { issues } = useSelector((rootState: RootState) => rootState.advancedSearch);

	useEffect(() => {
		dispatch(loadIssues());
	}, [dispatch]);

	return (
		<Table selectable compact>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>T</Table.HeaderCell>
					<Table.HeaderCell>Key</Table.HeaderCell>
					<Table.HeaderCell>Summary</Table.HeaderCell>
					<Table.HeaderCell>Assignee</Table.HeaderCell>
					<Table.HeaderCell>Reporter</Table.HeaderCell>
					<Table.HeaderCell>P</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Resolution</Table.HeaderCell>
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
