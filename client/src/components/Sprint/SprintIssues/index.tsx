import React from 'react';
import { List } from 'semantic-ui-react';

export const SprintIssue: React.FC = () => {
	return (
		<List celled verticalAlign="middle">
			<List.Item>
				<List.Content floated="left">Issue Icon</List.Content>
				<List.Content floated="left">
					<List.Header>Issue Title</List.Header>
				</List.Content>
				<List.Content floated="right">Issue Priority</List.Content>
				<List.Content floated="right">Issue Key</List.Content>
				<List.Content floated="right">Issue Assignee</List.Content>
			</List.Item>
		</List>
	);
};

export default SprintIssue;
