import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

const IssueTable: React.FC = () => {
	// get filtered issues from state
	// issue state updates with updating filter parts. So, on updateFilterPart we update issues.
	// here we will have filtered issues from state
	const { issues } = useSelector((rootState: RootState) => rootState.advancedSearch);
	useEffect(() => {});
	// const issues = [
	// 	{
	// 		priority: {
	// 			id: 'id',
	// 			color: 'string',
	// 			title: 'string',
	// 			icon: 'string',
	// 		},
	// 		summary: 'Very summary',
	// 		boardColumnID: '6d1',
	// 		labels: 'done',
	// 		attachments: 'attachments',
	// 		links: 'link1',
	// 		description: 'Very description',
	// 		sprintID: '52ce',
	// 		projectID: '9fc89a01-f610-48f7-b0ac-f11ef4db4532', //real
	// 		issueKey: 'TH-1',
	// 		assignedID: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551',
	// 		creator: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551', //real
	// 		type: {
	// 			id: 'type-id-12',
	// 			icon: 'check',
	// 			color: 'teal',
	// 			title: 'Issue',
	// 		},
	// 		id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
	// 	},
	// ];

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
