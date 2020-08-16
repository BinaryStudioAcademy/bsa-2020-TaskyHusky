import React from 'react';
import { List } from 'semantic-ui-react';
import Options, { ItemProps } from 'components/common/Options';
import styles from './styles.module.scss';

type Props = {
	id: string;
	isActive: boolean;
	name: string;
};

export const SprintHeader: React.FC<Props> = ({ id, isActive, name }) => {
	console.log(id, isActive, name);

	const config: ItemProps[] = [
		{
			id,
			text: 'Edit sprint',
			onClickAction: () => {},
		},
		{
			id,
			text: 'Delete sprint',
			onClickAction: () => {},
		},
	];

	return (
		<List horizontal className={styles.sprintHeader}>
			<List.Item>
				<List.Content>
					<List.Header>{name}</List.Header>
					{isActive ? `ACTIVE` : null}
				</List.Content>
			</List.Item>

			<List.Item>
				<List.Content>
					<List.Header>
						<Options config={config} />
					</List.Header>
				</List.Content>
			</List.Item>
		</List>
	);
};

export default SprintHeader;
