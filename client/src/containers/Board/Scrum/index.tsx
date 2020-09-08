import React, { useState, useEffect, ChangeEvent } from 'react';
import { Header, Container, Form, Button, InputOnChangeData, Icon } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs, BreadCrumbData } from './config/breadcrumbs';
import { useHistory, useLocation } from 'react-router-dom';
import CreateSprintModal from 'components/common/SprintModal/CreateSprintModal';
import getIssuesForSprintId from 'helpers/getIssuesBySearchText.helper';
import { normalizeText } from 'helpers/normalizeText.helper';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderIssues } from './helpers/reorder.helper';
import { isEmpty } from 'lodash-es';
import Sprint from 'components/Sprint';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import Spinner from 'components/common/Spinner';
import ScrumBoardSidebar from 'components/ScrumBoardSidebar';
import { SETTINGS_SECTION } from 'components/ScrumBoardSidebar/config/scrumSidebarItems';
import matchIssuesToSprint from 'helpers/matchIssuesToSprint.helper';
import ProjectIssuesPage from 'containers/ProjectIssuesPage';

const Scrum: BoardComponent = (props) => {
	const { pathname } = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');
	const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);

	const { sprints, project, issues } = useSelector((rootState: RootState) => rootState.scrumBoard);

	const [issuesMap, setIssuesMap] = useState<{ [sprintId: string]: WebApi.Entities.Issue[] }>(
		matchIssuesToSprint(sprints, issues),
	);

	const { board } = props;

	const projectDetails: BreadCrumbData = { id: project.id, name: project.name };
	const boardDetails: BreadCrumbData = { id: board.id, name: board.name };

	const onDragEndDrop = ({ destination, source }: DropResult) => {
		if (!destination) {
			return;
		}

		const sourceSprintId = source.droppableId;
		const destinationSprintId = destination.droppableId;
		const issueId = issuesMap[source.droppableId][source.index].id;

		if (sourceSprintId === destinationSprintId) {
			return;
		}

		if (destinationSprintId === 'backlog') {
			dispatch(
				updateIssue({
					id: issueId,
					data: {
						sprint: null,
						board: board.id,
					},
				}),
			);
		}

		if (destinationSprintId !== 'backlog' && sourceSprintId !== destinationSprintId) {
			dispatch(
				updateIssue({
					id: issueId,
					data: {
						sprint: destinationSprintId,
						board: board.id,
					},
				}),
			);
		}

		setIssuesMap(reorderIssues(issuesMap, source, destination));
	};

	useEffect(() => {
		dispatch(actions.saveBoardToState({ board }));
		dispatch(actions.loadIssuesTrigger({ boardId: board.id }));
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
		dispatch(actions.loadProjectTrigger({ boardId: board.id }));
	}, [dispatch, board]);

	useEffect(() => {
		setIssuesMap(matchIssuesToSprint(sprints, issues));
	}, [sprints, issues]);

	const sprintList = !isEmpty(issuesMap) ? (
		Object.entries(issuesMap)
			.reverse()
			.map(([sprintId, issues]: [string, WebApi.Entities.Issue[]]) => {
				return (
					<Sprint
						key={sprintId}
						listId={sprintId}
						boardId={board.id}
						listType="CARD"
						sprint={sprints.filter((sprint) => sprint.id === sprintId)[0]}
						issues={getIssuesForSprintId(normalizeText(search), issues)}
					/>
				);
			})
	) : (
		<Spinner />
	);

	const renderScrumBoard = (
		<>
			<div className={styles.breadcrumb}>
				<Breadcrumbs sections={setBreadcrumbs({ history, projectDetails, boardDetails })} />
			</div>
			<div className={styles.inlineContainer}>
				<Header as="h2" className={`standartHeader ${styles.scrumHeader}`}>
					{board.name}
				</Header>
				<Form.Input
					placeholder={t('search')}
					icon="search"
					value={search}
					onChange={(event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
						setSearch(data.value);
					}}
					style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
					id="searchIssuesField"
				/>
				<Button
					onClick={() => {
						setIsCreateModalOpened(!isCreateModalOpened);
					}}
					className={styles.createSprintButton}
				>
					{t('create_sprint')}
				</Button>
			</div>

			{!!sprints.filter((sprint) => !sprint.isCompleted).length ? null : (
				<Container className={styles.noSprintsContainer}>
					<Icon name="info circle" size="huge" />
					<Header as="h2" className={styles.noSprintsHeader}>
						<Header.Content>{t('no_sprints_header')}</Header.Content>
						<Header.Subheader>{t('no_sprints_header_subheader')}</Header.Subheader>
					</Header>
				</Container>
			)}

			<DragDropContext onDragEnd={onDragEndDrop}>{sprintList}</DragDropContext>
		</>
	);

	let renderComponent;

	switch (pathname) {
		case `/board/${board.id}/${SETTINGS_SECTION.details}`:
			renderComponent = <span className={styles.innerContainer} children="board settings" />;
			break;
		case `/board/${board.id}/${SETTINGS_SECTION.backlog}`:
			renderComponent = renderScrumBoard;
			break;
		case `/board/${board.id}/${SETTINGS_SECTION.issues}`:
			renderComponent =
				board.projects && board.projects.length ? (
					<ProjectIssuesPage projectId={board.projects[0].id} strict />
				) : (
					renderScrumBoard
				);
			break;
		case `/board/${board.id}/${SETTINGS_SECTION.activeSprint}`:
			renderComponent = <span children="board active sprint" />;
			break;
		case `/board/${board.id}/${SETTINGS_SECTION.reports}`:
			renderComponent = <span children="board reports" />;
			break;
		default:
			renderComponent = renderScrumBoard;
	}

	return (
		<>
			<div className={styles.container}>
				<ScrumBoardSidebar board={board} project={project} />
				<div className={styles.innerContainer}>{renderComponent}</div>
				<CreateSprintModal
					clickAction={() => {
						setIsCreateModalOpened(!isCreateModalOpened);
					}}
					isOpen={isCreateModalOpened}
				/>
			</div>
		</>
	);
};

export default Scrum;
