import React from 'react';
import { Table } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';

const IssueTable: React.FC = () => {
	const issues = [
		{
			priority: {
				id: 'id',
				color: 'string',
				title: 'string',
				icon: 'string',
			},
			summary: 'Very summary',
			boardColumnID: '6d1',
			labels: 'done',
			attachments: 'attachments',
			links: 'link1',
			description: 'Very description',
			sprintID: '52ce',
			projectID: '9fc89a01-f610-48f7-b0ac-f11ef4db4532', //real
			issueKey: 'TH-1',
			assignedID: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551',
			creatorID: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551', //real
			type: {
				id: 'type-id-12',
				icon: 'check',
				color: 'teal',
				title: 'Issue',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
		},
		{
			priority: {
				id: 'id',
				color: 'string',
				title: 'string',
				icon: 'string',
			},
			summary: 'Interface implemented',
			boardColumnID: '6d1',
			labels: 'done',
			attachments: 'attachments',
			links: 'link1',
			description: 'Very description',
			sprintID: '52ce',
			projectID: '47ab4c46-e506-4dcb-a4d3-79b47cdc16a5', //real
			issueKey: 'TH-1',
			assignedID: 'e89a7a50-68f2-4a43-a043-80eec52e0ac8',
			creatorID: 'e89a7a50-68f2-4a43-a043-80eec52e0ac8', // real
			type: {
				id: 'id-212',
				icon: 'close',
				color: 'blue',
				title: 'Task',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d92',
		},
	];

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
