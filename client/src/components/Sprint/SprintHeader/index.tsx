import React, { useState } from 'react';
import { List, Item, Button } from 'semantic-ui-react';

import Options, { ConfigItem } from 'components/common/Options';
import styles from './styles.module.scss';
import CreateIssueModal from 'containers/CreateIssueModal';
import DeleteSprintModal from 'components/common/SprintModal/DeleteSprintModal';
import EditSprintModal from 'components/common/SprintModal/EditSprintModal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

type Props = {
	id: string;
	isActive: boolean;
	isCompleted: boolean;
	name: string;
	issues: WebApi.Entities.Issue[];
};

export const SprintHeader: React.FC<Props> = ({ id, isActive, name, issues, isCompleted }) => {
	const {
		project: { id: projectId },
	} = useSelector((rootState: RootState) => rootState.scrumBoard);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const { t } = useTranslation();

	const config: ConfigItem[] = [
		{
			id,
			text: t('edit_sprint'),
			onClickAction: () => {
				setIsEditModalOpen(true);
			},
		},
		{
			id,
			text: t('delete_sprint'),
			onClickAction: () => {
				setIsDeleteModalOpen(true);
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
						<CreateIssueModal projectID={projectId} sprintID={id}>
							<Button icon="add" className={styles.createIssueButton} title="Create issue" />
						</CreateIssueModal>
						<Options config={config} />
					</List.Content>
				</List.Item>
			</List>
			<DeleteSprintModal
				sprintName={name}
				sprintId={id}
				sprintIssues={issues}
				isOpen={isDeleteModalOpen}
				clickAction={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
			/>
			<EditSprintModal
				sprintName={name}
				sprintId={id}
				sprintIssues={issues}
				sprintIsActive={isActive}
				sprintIsCompleted={isCompleted}
				isOpen={isEditModalOpen}
				clickAction={() => setIsEditModalOpen(!isEditModalOpen)}
			/>
		</>
	);
};

export default SprintHeader;
