import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	index: number;
}

const InteractiveColumn: React.FC<Props> = ({ column, index }) => {
	const { t } = useTranslation();

	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Segment className={styles.column}>
						<div className={styles.columnHeader}>
							<h3 style={{ textTransform: 'uppercase' }}>{column.columnName}</h3>
							<div className={styles.columnControls}>
								<Icon link name="edit outline" title={t('update')} onClick={() => {}} />
								<Icon
									link
									title={t('delete')}
									name="trash alternate outline"
									onClick={() => {}}
									className={styles.redOnHover}
								/>
							</div>
						</div>
					</Segment>
				</div>
			)}
		</Draggable>
	);
};

export default InteractiveColumn;
