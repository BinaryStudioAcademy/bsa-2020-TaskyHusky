import React, { useState, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { orderBy } from 'lodash-es';

import { setProjectActions } from './config/projectActions';
import { useHistory, Link } from 'react-router-dom';
import Options from 'components/common/Options';
import { useDispatch } from 'react-redux';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';
import styles from './styles.module.scss';
import UserAvatar from 'components/common/UserAvatar';

type SortByColumn = 'name' | 'key' | 'lead';
type SortDirections = 'ascending' | 'descending';

interface Props {
	projects: WebApi.Entities.Projects[];
}

const ProjectsTable = ({ projects }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();

	const [sortByColumn, setSortByColumn] = useState<SortByColumn>('lead');
	const [sortDirection, setSortDirection] = useState<SortDirections>('ascending');

	const sortedProjects = useMemo(() => {
		if (sortDirection === 'descending') {
			return orderBy(projects, [sortByColumn], ['desc']);
		}
		return orderBy(projects, [sortByColumn], ['asc']);
	}, [projects, sortDirection, sortByColumn]);

	const onOpenSettings = (id: string): void => {
		history.push(history.location.pathname + '/projectSettings/' + id);
	};

	const onTrash = (id: string): void => {
		dispatch(generalProjectActions.startDeletingProject({ id }));
	};

	const changeSort = (column: SortByColumn) => {
		if (column === sortByColumn) {
			const direction = sortDirection === 'ascending' ? 'descending' : 'ascending';
			setSortDirection(direction);
			return;
		}
		setSortDirection('ascending');
		setSortByColumn(column);
	};
	return (
		<div>
			<Table sortable unstackable className={styles.table}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							className={[styles.column__name, styles.table__header_cell].join(' ')}
							sorted={sortDirection}
							onClick={() => changeSort('name')}
						>
							{t('name')}
						</Table.HeaderCell>
						<Table.HeaderCell
							className={[styles.column__key, styles.table__header_cell].join(' ')}
							sorted={sortDirection}
							onClick={() => changeSort('key')}
						>
							{t('key')}
						</Table.HeaderCell>
						<Table.HeaderCell className={styles.table__header_cell}>{t('type')}</Table.HeaderCell>
						<Table.HeaderCell
							className={styles.table__header_cell}
							sorted={sortDirection}
							onClick={() => changeSort('lead')}
						>
							{t('lead')}
						</Table.HeaderCell>
						<Table.HeaderCell
							className={[styles.column__settings, styles.table__header_cell].join(' ')}
						></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{sortedProjects.map(({ id, name, key, icon, lead }) => (
						<Table.Row key={id}>
							<Table.Cell className={[styles.project__name_container].join(' ')}>
								<Link to={`/project/${id}/issues`}>
									<img className={styles.project__img} src={icon} alt="Project avatar" />
									<span className={styles.project__name}>{name}</span>
								</Link>
							</Table.Cell>
							<Table.Cell>{key}</Table.Cell>
							<Table.Cell>Software</Table.Cell>
							<Table.Cell className={styles.project__lead_container}>
								<UserAvatar user={lead} small />
								<span>{`${lead.firstName} ${lead.lastName}`}</span>
							</Table.Cell>

							<Table.Cell>
								<Options
									config={setProjectActions({ id, onOpenSettings, onTrash })}
									isBackgroundShown={false}
								/>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default ProjectsTable;
