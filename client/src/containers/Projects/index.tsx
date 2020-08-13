import React, { useState, ChangeEvent } from 'react';
import { Input, Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Options from './../../components/common/Options';
import CreateProjectModal from '../CreateProjectModal';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';
import { setProjectActions } from './config/projectActions';
import { useHistory, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Projects: React.FC = () => {
	const history = useHistory();
	const { t } = useTranslation();
	const { projects, isLoading } = useSelector((rootState: RootState) => rootState.projects);

	const [searchName, setSearchName] = useState('');

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

	const searchString = new RegExp(searchName, 'i');
	const filteredData = (projects || []).filter(({ name }) => searchString.test(name));

	const onOpenSettings = (id: string): void => {
		history.push(history.location.pathname + '/projectSettings/' + id);
		console.log('onOpenSettings');
	};
	const onTrash = (id: string): void => {
		console.log('onTrash ' + id);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__title}>
				<h1 className={styles.title}>{t('projects')}</h1>
				<CreateProjectModal />
			</div>
			<div className={[styles.wrapper__filters, styles.filters].join(' ')}>
				<Input icon="search" placeholder={t('search')} onChange={onSearch} value={searchName} />
			</div>
			<div className={styles.wrapper__table}>
				<Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>{t('name')}</Table.HeaderCell>
							<Table.HeaderCell>{t('key')}</Table.HeaderCell>
							<Table.HeaderCell>{t('type')}</Table.HeaderCell>
							<Table.HeaderCell>{t('lead')}</Table.HeaderCell>
							<Table.HeaderCell>{t('board')}</Table.HeaderCell>
							<Table.HeaderCell>{t('settings')}</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					{isLoading ? null : (
						<Table.Body>
							{filteredData.map(({ id, name, key }) => (
								<Table.Row key={id}>
									<Table.Cell>{name}</Table.Cell>
									<Table.Cell>{key}</Table.Cell>
									<Table.Cell>Cell</Table.Cell>
									<Table.Cell>Cell</Table.Cell>
									<Table.Cell>
										<NavLink to={`/project/${id}/issues`}>{t('go_to_board')}</NavLink>
									</Table.Cell>
									<Table.Cell>
										<Options config={setProjectActions({ id, onOpenSettings, onTrash })} />
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					)}
				</Table>
				{isLoading ? <Spinner /> : ''}
			</div>
		</div>
	);
};

export default Projects;
