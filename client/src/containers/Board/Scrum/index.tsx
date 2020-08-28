import React, { useState, useEffect, ChangeEvent } from 'react';
import { Header, Container, Form, Button, InputOnChangeData } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs, BreadCrumbData } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';
import { extractUUIDFromArrayOfObjects } from 'helpers/extractUUIDFromArrayOfObjects.helper';
import CreateSprintModal from 'components/common/SprintModal/CreateSprintModal';
import getIssuesForSprintId from 'helpers/getIssuesBySearchText.helper';
import { normalizeText } from 'helpers/normalizeText.helper';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderIssues } from './helpers/reorder';
import { isEmpty } from 'lodash-es';
import Sprint from 'components/Sprint';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import Spinner from 'components/common/Spinner';

const Scrum: BoardComponent = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');
	const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);
	const [issuesMap, setIssuesMap] = useState<{ [sprintId: string]: WebApi.Entities.Issue[] }>({});
	const state = useSelector((rootState: RootState) => rootState.scrumBoard);

	const { sprints, project, matchIssuesToSprint, backlog } = useSelector(
		(rootState: RootState) => rootState.scrumBoard,
	);

	const { board } = props;

	const projectDetails: BreadCrumbData = { id: project.id, name: project.name };
	const boardDetails: BreadCrumbData = { id: board.id, name: board.name };

	const clearSearchInputValue = (): void => {
		setSearch('');
	};

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
					},
				}),
			);
		}

		setIssuesMap(reorderIssues(issuesMap, source, destination));
	};

	useEffect(() => {
		dispatch(actions.saveBoardToState({ board }));
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
		dispatch(actions.loadProjectTrigger({ boardId: board.id }));
		dispatch(actions.loadBacklogTrigger({ boardId: board.id }));
	}, [dispatch, board]);

	useEffect(() => {
		if (!!sprints.length) {
			const arrayOfIds = extractUUIDFromArrayOfObjects(sprints);
			arrayOfIds.forEach((id) => {
				dispatch(actions.loadIssuesTrigger({ sprintId: id }));
			});
		}
	}, [sprints.length, sprints, dispatch]);

	useEffect(() => {
		setIssuesMap({ ...matchIssuesToSprint, backlog: backlog });
	}, [state, matchIssuesToSprint, backlog]);
	console.log(issuesMap);

	const sprintList =
		!isEmpty(sprints) && !isEmpty(issuesMap) ? (
			Object.entries(issuesMap).map(([sprintId, issues]: [string, WebApi.Entities.Issue[]]) => {
				return (
					<Sprint
						key={sprintId}
						listId={sprintId}
						listType="CARD"
						sprint={sprints.filter((sprint) => sprint.id === sprintId)[0]}
						issues={getIssuesForSprintId(normalizeText(search), issues)}
					/>
				);
			})
		) : (
			<Spinner />
		);

	return (
		<>
			<Container>
				<Container className={styles.breadcrumb}>
					<Breadcrumbs sections={setBreadcrumbs({ history, projectDetails, boardDetails })} />
				</Container>
				<Container className={styles.inlineContainer}>
					<Header as="h2">{board.name}</Header>
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
					<Button onClick={clearSearchInputValue} secondary>
						{t('clear')}
					</Button>
					<Button
						onClick={() => {
							setIsCreateModalOpened(!isCreateModalOpened);
						}}
						secondary
						className={styles.createSprintButton}
					>
						{t('create_sprint')}
					</Button>
				</Container>

				<DragDropContext onDragEnd={onDragEndDrop}>{sprintList}</DragDropContext>
			</Container>
			<CreateSprintModal
				clickAction={() => {
					setIsCreateModalOpened(!isCreateModalOpened);
				}}
				isOpen={isCreateModalOpened}
			/>
		</>
	);
};

export default Scrum;
