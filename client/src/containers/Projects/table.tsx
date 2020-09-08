import React, { useState, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { orderBy } from 'lodash-es';

import { setProjectActions } from './config/projectActions';

import { useHistory, Link, useLocation } from 'react-router-dom';
import Options from 'components/common/Options';
import { useDispatch } from 'react-redux';
import * as generalProjectActions from 'components/ProjectsCommon/logic/actions';
import styles from './styles.module.scss';
import UserAvatar from 'components/common/UserAvatar';
import { User } from 'containers/LoginPage/logic/state';
import { SETTINGS_SECTION } from 'components/ProjectSidebar/config/sidebarItems';

type SortByColumn = 'name' | 'key' | 'lead';
type SortDirections = 'ascending' | 'descending';

interface Props {
	projects: WebApi.Entities.Projects[];
	currentUser: User | null;
}

const ProjectsTable = ({ projects, currentUser }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { pathname } = useLocation();

	const [sortByColumn, setSortByColumn] = useState<SortByColumn>('lead');
	const [sortDirection, setSortDirection] = useState<SortDirections>('ascending');

	const sortedProjects = useMemo(() => {
		if (sortByColumn === 'lead') {
			if (sortDirection === 'descending') {
				return orderBy(projects, (project) => project.lead.firstName, ['desc']);
			}
			return orderBy(projects, (project) => project.lead.firstName, ['asc']);
		}

		if (sortDirection === 'descending') {
			return orderBy(projects, [sortByColumn], ['desc']);
		}
		return orderBy(projects, [sortByColumn], ['asc']);
	}, [projects, sortDirection, sortByColumn]);

	const onOpenSettings = (id: string): void => {
		history.push(`${pathname}/projectSettings/${id}/${SETTINGS_SECTION.details}`);
	};

	const onTrash = (id: string): void => {
		dispatch(generalProjectActions.startDeletingProject({ id, projects }));
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

	const getUsername = (lead: WebApi.Entities.UserProfile): string => `${lead.firstName} ${lead.lastName}`;

	return (
		<div>
			<Table selectable sortable unstackable className={styles.tableContainer}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={4}
							className={styles.table__header_cell}
							sorted={sortByColumn === 'name' ? sortDirection : undefined}
							onClick={() => changeSort('name')}
							children={t('name')}
						/>
						<Table.HeaderCell
							width={2}
							className={styles.table__header_cell}
							sorted={sortByColumn === 'key' ? sortDirection : undefined}
							onClick={() => changeSort('key')}
							children={t('key')}
						/>
						<Table.HeaderCell width={3} className={styles.table__header_cell}>
							{t('type')}
						</Table.HeaderCell>
						<Table.HeaderCell
							width={4}
							className={styles.table__header_cell}
							sorted={sortByColumn === 'lead' ? sortDirection : undefined}
							onClick={() => changeSort('lead')}
							children={t('lead')}
						/>
						<Table.HeaderCell width={1} className={styles.table__header_cell} />
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{sortedProjects.map(({ id, name, key, icon, lead }) => (
						<Table.Row key={id}>
							<Table.Cell>
								<Link to={`/project/${id}`} className={styles.project__name_container}>
									{icon && <img className={styles.project__img} src={icon} alt="Avatar" />}
									<span className={styles.project__name}>{name}</span>
								</Link>
							</Table.Cell>
							<Table.Cell className="textData">{key}</Table.Cell>
							<Table.Cell className="textData">Software</Table.Cell>
							<Table.Cell className={styles.project__lead_wrapper}>
								<span className={styles.project__lead_container}>
									<UserAvatar user={lead} small />
									<span>{getUsername(lead)} </span>
								</span>
							</Table.Cell>
							<Table.Cell className={styles.table__column_options}>
								{currentUser?.id === lead.id && (
									<Options
										config={setProjectActions({ id, onOpenSettings, onTrash })}
										isBackgroundShown={false}
									/>
								)}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default ProjectsTable;
