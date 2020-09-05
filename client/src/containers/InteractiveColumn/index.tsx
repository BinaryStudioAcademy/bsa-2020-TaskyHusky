import React, { useState } from 'react';
import { Segment, Icon, Divider } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import EditForm from './EditForm';
import { ContextProvider } from 'containers/CreateColumnModal/logic/context';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	index: number;
}

const InteractiveColumn: React.FC<Props> = ({ column: givenColumn, index }) => {
	const { t } = useTranslation();
	const [column, setColumn] = useState<WebApi.Result.BoardColumnResult>(givenColumn);

	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Segment className={styles.column}>
						<div className={styles.columnHeader}>
							<h3 className={styles.uppercase}>{column.columnName}</h3>
							<div className={styles.columnControls}>
								<span className={styles.status}>{column.status}</span>
								<Icon
									link
									title={t('delete')}
									name="trash alternate outline"
									onClick={() => {}}
									className={styles.redOnHover}
								/>
							</div>
						</div>
						<Divider horizontal />
						<ContextProvider initialState={column}>
							<EditForm
								columnId={column.id}
								onSubmit={(data) => setColumn({ ...column, ...data, board: column.board })}
							/>
						</ContextProvider>
					</Segment>
				</div>
			)}
		</Draggable>
	);
};

export default InteractiveColumn;
