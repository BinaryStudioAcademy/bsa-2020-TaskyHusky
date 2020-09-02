import React, { useState, useEffect } from 'react';
import { BoardComponent } from '../';
import BoardColumn from 'containers/BoardColumn';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import { getByKey, updateIssueByKey } from 'services/issue.service';
import { Header, Form, Button, Breadcrumb, Segment, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { convertIssueResultToPartialIssue } from 'helpers/issueResultToPartialIssue';
import CreateColumnModal from 'containers/CreateColumnModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { setColumnCreated } from 'containers/BoardColumn/logic/actions';

const Kanban: BoardComponent = ({ board }) => {
	const [search, setSearch] = useState<string>('');
	const [columns, setColumns] = useState<WebApi.Result.BoardColumnResult[]>(board.columns);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { columnCreated, recentlyCreatedColumn } = useSelector((state: RootState) => state.boardColumn);
	const onDragEndFuncs: Map<string, OnDragEndResponder> = new Map<string, OnDragEndResponder>();

	useEffect(() => {
		if (columnCreated) {
			dispatch(setColumnCreated({ created: false }));

			if (recentlyCreatedColumn) {
				setColumns([...columns, recentlyCreatedColumn]);
			}
		}
	}, [dispatch, columnCreated, recentlyCreatedColumn, columns]);

	const onDragEnd: OnDragEndResponder = (event, provided) => {
		const { destination, draggableId } = event;

		if (!destination) {
			return;
		}

		const destinationId = extractIdFormDragDropId(destination.droppableId);
		const cardKey = extractIdFormDragDropId(draggableId);
		onDragEndFuncs.forEach((func) => func(event, provided));

		getByKey(cardKey).then((issue) => {
			const { watchers, ...issueToSend } = issue;

			return updateIssueByKey(
				cardKey,
				convertIssueResultToPartialIssue(issueToSend, { boardColumn: destinationId }),
			);
		});
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inlineContainer}>
				<Header as="h2">{board.name}</Header>
				<Form.Input
					placeholder={t('search')}
					icon="search"
					value={search}
					onChange={(event, data) => setSearch(data.value)}
					style={{ marginRight: 60, maxWidth: 250 }}
				/>
				<Button onClick={() => setSearch('')} className="cancelBtn" compact>
					{t('clear')}
				</Button>
			</div>
			<Breadcrumb style={{ marginBottom: 20 }}>
				<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right chevron" />
				<Breadcrumb.Section link>Test project name</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{board.name}</Breadcrumb.Section>
			</Breadcrumb>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className={styles.columnsFlex}>
					{columns.map((column, i) => (
						<BoardColumn
							getOnDragEndFunc={(id, responder) => onDragEndFuncs.set(id, responder)}
							search={search}
							className={styles.column}
							column={column}
							key={i}
						/>
					))}
					<CreateColumnModal boardId={board.id}>
						<Segment className={`${styles.column} contentBtn`} style={{ position: 'relative', top: -14 }}>
							<Icon name="plus" size="large" />
							{t('create_column')}
						</Segment>
					</CreateColumnModal>
				</div>
			</DragDropContext>
		</div>
	);
};

export default Kanban;
