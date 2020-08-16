import React from 'react';
import { List } from 'semantic-ui-react';

export const SprintHeader: React.FC = () => {
	return (
		<List horizontal>
			<List.Item>
				<List.Content>
					<List.Header>Sprint Name</List.Header>
					Sprint Status
				</List.Content>
			</List.Item>

			<List.Item>
				<List.Content>
					<List.Header>Edit Button</List.Header>
				</List.Content>
			</List.Item>
		</List>
	);
};

export default SprintHeader;
