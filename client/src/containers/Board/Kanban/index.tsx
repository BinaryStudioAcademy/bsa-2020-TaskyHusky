import React, { useState } from 'react';
import { BoardComponent } from '../';
import BoardColumn from 'containers/BoardColumn';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { extractIdFormDragDropId } from 'helpers/extractId.helper';
import { getByKey, updateIssueByKey } from 'services/issue.service';
import { Header, Form, Button, Breadcrumb } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

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

		getByKey(cardKey).then((issue) =>
			updateIssueByKey(cardKey, {
				...issue,
				type: issue.type.id,
				priority: issue.priority.id,
				boardColumn: destinationId,
			}),
		);
	};

	return (
		<>
			<Header as="h2" style={{ marginLeft: 20 }}>
				{board.name}
			</Header>
			<Breadcrumb style={{ marginLeft: 20, marginBottom: 20 }}>
				<Breadcrumb.Section link>{t('projects')}</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right chevron" />
				<Breadcrumb.Section link>Test project name</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right arrow" />
				<Breadcrumb.Section active>{board.name}</Breadcrumb.Section>
			</Breadcrumb>
			<Form>
				<Form.Group>
					<Form.Input
						placeholder={t('search')}
						icon="search"
						value={search}
						onChange={(event, data) => setSearch(data.value)}
						style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
					/>
					<Button onClick={() => setSearch('')} secondary>
						{t('clear')}
					</Button>
				</Form.Group>
			</Form>
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
		</>
	);
};

export default Kanban;
