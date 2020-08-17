import React from 'react';
import { List, Item, Button } from 'semantic-ui-react';

import Options, { ItemProps } from 'components/common/Options';
import styles from './styles.module.scss';
import CreateIssueModal from 'containers/CreateIssueModal';
import SprintModal from 'components/common/SprintModal';

type Props = {
	id: string;
	isActive: boolean;
	name: string;
};

export const SprintHeader: React.FC<Props> = ({ id, isActive, name }) => {
	const [open, setOpen] = React.useState(false);

	const config: ItemProps[] = [
		{
			id,
			text: 'Edit sprint',
			onClickAction: () => {
				console.log('Edit sprint clicked');
			},
		},
		{
			id,
			text: 'Delete sprint',
			onClickAction: () => {
				setOpen(true);
			},
		},
	];

	return (
		<>
			<List horizontal className={styles.sprintHeader}>
				<List.Item>
					<List.Content>
						<List.Header className={styles.sprintHeaderTitle}>{name}</List.Header>
						{isActive ? <Item className={styles.sprintHeaderStatus}>ACTIVE</Item> : null}
					</List.Content>
				</List.Item>

				<List.Item>
					<List.Content className={styles.rightContent}>
						<CreateIssueModal>
							<Button icon="add" className={styles.createIssueButton} title="Create issue" />
						</CreateIssueModal>
						<Options config={config} />
					</List.Content>
				</List.Item>
			</List>
			<SprintModal sprintName={name} isOpen={open} clickAction={() => setOpen(!open)} />
		</>
	);
};

export default SprintHeader;
