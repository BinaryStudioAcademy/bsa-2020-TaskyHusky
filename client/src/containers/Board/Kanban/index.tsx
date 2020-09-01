import React, { useState } from 'react';
import { BoardComponent } from '../';
import BoardColumn from 'containers/BoardColumn';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import { getByKey, updateIssueByKey } from 'services/issue.service';
import { Header, Form, Button, Breadcrumb } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { convertIssueResultToPartialIssue } from 'helpers/issueResultToPartialIssue';
import CreateColumnModal from 'containers/CreateColumnModal';

const Kanban: BoardComponent = ({ board }) => {
	const [search, setSearch] = useState<string>('');
	const { t } = useTranslation();
	const onDragEndFuncs: Map<string, OnDragEndResponder> = new Map<string, OnDragEndResponder>();

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
			<div className={styles.header}>
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
				<CreateColumnModal boardId={board.id}>
					<Button className="primaryBtn" style={{ height: 40 }}>
						{t('create_column')}
					</Button>
				</CreateColumnModal>
			</div>
			<Breadcrumb style={{ marginBottom: 20 }}>
				<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right chevron" />
				<Breadcrumb.Section link>Test project name</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{board.name}</Breadcrumb.Section>
			</Breadcrumb>
			<DragDropContext onDragEnd={onDragEnd}>
				<div
					className={styles.columnsGrid}
					style={{ gridTemplateColumns: '300px '.repeat(board.columns.length).trim() }}
				>
					{board.columns.map((column, i) => (
						<BoardColumn
							getOnDragEndFunc={(id, responder) => onDragEndFuncs.set(id, responder)}
							search={search}
							className={styles.column}
							column={column}
							key={i}
						/>
					))}
				</div>
			</DragDropContext>
		</div>
	);
};

export default Kanban;
