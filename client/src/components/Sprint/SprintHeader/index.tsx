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
import { useHistory } from 'react-router-dom';

type Props = {
	id: string;
	isActive: boolean;
	isCompleted: boolean;
	name: string;
	issues: WebApi.Entities.Issue[];
	endDate: Date | undefined;
	startDate: Date | undefined;
};

export const SprintHeader: React.FC<Props> = ({ id, isActive, name, issues, isCompleted, startDate, endDate }) => {
	const history = useHistory();
	const {
		project: { id: projectId },
		board: { id: boardId },
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
						{id && isActive && (
							<Button
								onClick={() => {
									history.push(`/report/${id}`);
								}}
								icon="chart line"
								className={styles.createIssueButton}
								title="Burndown chart"
							/>
						)}
						<CreateIssueModal projectID={projectId} sprintID={id} boardID={boardId}>
							<Button icon="add" className={styles.createIssueButton} title="Create issue" />
						</CreateIssueModal>
						{id !== 'backlog' ? <Options config={config} /> : null}
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
				startDate={startDate}
				endDate={endDate}
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
