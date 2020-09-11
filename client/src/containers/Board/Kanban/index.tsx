import React, { useState, useEffect } from 'react';
import { BoardComponent } from '../';
import BoardColumn from 'containers/BoardColumn';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import { getIssuesByBoardId } from 'services/issue.service';
import { Form, Breadcrumb, Segment, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import CreateColumnModal from 'containers/CreateColumnModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { setColumnCreated } from 'containers/BoardColumn/logic/actions';
import Options from 'components/common/Options';
import historyHelper from 'helpers/history.helper';
import KanbanBoardSidebar from 'containers/KanbanBoardSidebar';
import { SectionType } from 'containers/KanbanBoardSidebar/config/sections';
import ProjectIssuesPage from 'containers/ProjectIssuesPage';
import ColumnsSettingsPage from 'containers/ColumnsSettingsPage';
import callWebApi from 'helpers/callApi.helper';

const Kanban: BoardComponent = ({ board, noSidebar }) => {
	const [search, setSearch] = useState<string>('');
	const [columns, setColumns] = useState<WebApi.Result.BoardColumnResult[]>(board.columns);
	const [sidebarSection, setSidebarSection] = useState<SectionType>(SectionType.board);
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[]>([]);
	const [issuesRequested, setIssuesRequested] = useState<boolean>(false);
	const [issuesResponded, setIssuesResponded] = useState<boolean>(false);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { columnCreated, recentlyCreatedColumn } = useSelector((state: RootState) => state.boardColumn);
	const onDragEndFuncs: Map<string, OnDragEndResponder> = new Map<string, OnDragEndResponder>();
	const getIssueIdsMap: Map<string, () => string[]> = new Map<string, () => string[]>();

	useEffect(() => {
		if (columnCreated) {
			dispatch(setColumnCreated({ created: false }));

			if (recentlyCreatedColumn) {
				setColumns([...columns, recentlyCreatedColumn]);
			}
		}
	}, [dispatch, columnCreated, recentlyCreatedColumn, columns]);

	useEffect(() => {
		if (!issuesRequested) {
			getIssuesByBoardId(board.id).then((issues) => {
				setIssues(issues);
				setIssuesResponded(true);
			});

			setIssuesRequested(true);
		}
	}, [issuesResponded, issuesRequested, issues, board.id]);

	const onDragEnd: OnDragEndResponder = (event, provided) => {
		const { destination, source } = event;

		if (!destination) {
			return;
		}

		const destinationId = extractIdFormDragDropId(destination.droppableId);
		const sourceId = extractIdFormDragDropId(source.droppableId);
		onDragEndFuncs.forEach((func) => func(event, provided));

		const body: { [columnId: string]: string[] } = {
			[destinationId]: (getIssueIdsMap.get(destinationId) as () => string[])(),
		};

		if (destinationId !== sourceId) {
			body[sourceId] = (getIssueIdsMap.get(sourceId) as () => string[])();
		}

		callWebApi({
			method: 'POST',
			endpoint: 'issue/reindex/columns',
			body,
		});
	};

	if (!issuesRequested || !issuesResponded) {
		return null;
	}

	const renderBoard = (
		<div className={styles.wrapper}>
			<Breadcrumb className={styles.breadcrumb}>
				<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider>&nbsp;/&nbsp;</Breadcrumb.Divider>
				<Breadcrumb.Section href={`/project/${(board.projects ?? [])[0].id}/issues`}>
					{(board.projects ?? [])[0].name}
				</Breadcrumb.Section>
				<Breadcrumb.Divider>&nbsp;/&nbsp;</Breadcrumb.Divider>
				<Breadcrumb.Section active className={styles.active}>
					{board.name}
				</Breadcrumb.Section>
			</Breadcrumb>
			<div className={styles.headerWrapper}>
				<div className={styles.inlineContainer}>
					<div className="standartHeader">{board.name}</div>
					<Form.Input
						placeholder={t('search')}
						icon="search"
						value={search}
						onChange={(event, data) => setSearch(data.value)}
						className={styles.searchInput}
					/>
				</div>
				<Options
					config={[
						{
							id: '0',
							text: t('go_to_columns_settings'),
							onClickAction: () => historyHelper.push(`/board/${board.id}/columnsSettings`),
						},
					]}
				/>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className={styles.columnsFlex}>
					{columns.map((column, i) => (
						<BoardColumn
							getOnDragEndFunc={(id, responder) => onDragEndFuncs.set(id, responder)}
							search={search}
							className={styles.column}
							column={column}
							issues={issues
								.filter((issue) => issue.boardColumn?.id === column.id)
								.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))}
							allIssues={issues}
							issuesGetter={(getIssueIds) => getIssueIdsMap.set(column.id, getIssueIds)}
							key={i}
							boardId={board.id}
						/>
					))}
					<CreateColumnModal boardId={board.id}>
						<Segment className={styles.contentBtn}>
							<Icon name="plus" />
							{t('create_column')}
						</Segment>
					</CreateColumnModal>
				</div>
			</DragDropContext>
		</div>
	);

	const renderIssues = <ProjectIssuesPage strict noSidebar projectId={(board.projects ?? [])[0].id} />;
	const renderSettings = <ColumnsSettingsPage boardId={board.id} />;
	let render;

	switch (sidebarSection) {
		case SectionType.board:
			render = renderBoard;
			break;
		case SectionType.issues:
			render = renderIssues;
			break;
		case SectionType.settings:
			render = renderSettings;
			break;
		default:
			render = renderBoard;
	}

	return (
		<div className={styles.outerContainer}>
			{noSidebar ? (
				''
			) : (
				<KanbanBoardSidebar
					onChangeSection={setSidebarSection}
					project={(board.projects ?? [])[0]}
					currentSection={sidebarSection}
				/>
			)}
			<div className={styles.render}>{noSidebar ? renderBoard : render}</div>
		</div>
	);
};

export default Kanban;
