import React, { useState, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { orderBy } from 'lodash-es';

import { setProjectActions } from './config/projectActions';
import { useHistory, NavLink } from 'react-router-dom';
import Options from 'components/common/Options';
import { useDispatch } from 'react-redux';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';
import styles from './styles.module.scss';

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
			<Table celled padded sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell sorted={sortDirection} onClick={() => changeSort('name')}>
							{t('name')}
						</Table.HeaderCell>
						<Table.HeaderCell sorted={sortDirection} onClick={() => changeSort('key')}>
							{t('key')}
						</Table.HeaderCell>
						<Table.HeaderCell>{t('type')}</Table.HeaderCell>
						<Table.HeaderCell sorted={sortDirection} onClick={() => changeSort('lead')}>
							{t('lead')}
						</Table.HeaderCell>
						<Table.HeaderCell>{t('board')}</Table.HeaderCell>
						<Table.HeaderCell>{t('settings')}</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{sortedProjects.map(({ id, name, key, icon, lead: { firstName, lastName } }) => (
						<Table.Row key={id}>
							<Table.Cell className={styles.project__name_container}>
								<img className={styles.project__img} src={icon} alt="Project avatar" />
								<span className={styles.project__name}>{name}</span>
							</Table.Cell>
							<Table.Cell>{key}</Table.Cell>
							<Table.Cell>Software</Table.Cell>
							<Table.Cell>{`${firstName} ${lastName}`}</Table.Cell>
							<Table.Cell>
								<NavLink to={`/project/${id}/issues`}>{t('go_to_board')}</NavLink>
							</Table.Cell>
							<Table.Cell>
								<Options config={setProjectActions({ id, onOpenSettings, onTrash })} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default ProjectsTable;
