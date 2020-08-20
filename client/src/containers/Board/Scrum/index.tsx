import React, { useState, useEffect, ChangeEvent } from 'react';
import { Header, Container, Form, Button, InputOnChangeData, Icon } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs, BreadCrumbData } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';
import Sprint from 'components/Sprint';
import { extractUUIDFromArrayOfObjects } from 'helpers/extractUUIDFromArrayOfObjects.helper';
import CreateSprintModal from 'components/common/SprintModal/CreateSprintModal';
import getIssuesForSprintId from 'helpers/getIssuesForSprintId.helper';

const Scrum: BoardComponent = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');
	const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);
	const { sprints, project, matchIssuesToSprint } = useSelector((rootState: RootState) => rootState.scrumBoard);
	const { board } = props;

	const projectDetails: BreadCrumbData = { id: project.id, name: project.name };
	const boardDetails: BreadCrumbData = { id: board.id, name: board.name };

	const clearSearchInputValue = (): void => {
		setSearch('');
	};

	useEffect(() => {
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
		dispatch(actions.loadProjectTrigger({ boardId: board.id }));
		dispatch(actions.saveBoardToState({ board }));
	}, [dispatch, board]);

	useEffect(() => {
		if (sprints.length > 0) {
			const arrayOfIds = extractUUIDFromArrayOfObjects(sprints);
			arrayOfIds.forEach((id) => {
				dispatch(actions.loadIssuesTrigger({ sprintId: id }));
			});
		}
	}, [sprints.length, sprints, dispatch]);

	const sprintList =
		sprints.length > 0 ? (
			sprints.map((sprint) => {
				return (
					<Sprint
						key={sprint.id}
						{...sprint}
						issues={getIssuesForSprintId(search, matchIssuesToSprint, sprint.id)}
					/>
				);
			})
		) : (
			<Container className={styles.noSprintsContainer}>
				<Icon name="info circle" size="huge" />
				<Header as="h2" className={styles.noSprintsHeader}>
					<Header.Content>{t('no_sprints_header')}</Header.Content>
					<Header.Subheader>{t('no_sprints_header_subheader')}</Header.Subheader>
				</Header>
			</Container>
		);

	return (
		<>
			<Container>
				<Container className={styles.breadcrumb}>
					<Breadcrumbs sections={setBreadcrumbs({ history, projectDetails, boardDetails })} />
				</Container>
				<Container className={styles.inlineContainer}>
					<Header as="h2">{board.name}</Header>
					<Form.Input
						placeholder={t('search')}
						icon="search"
						value={search}
						onChange={(event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
							setSearch(data.value);
						}}
						style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
						id="searchIssuesField"
					/>
					<Button onClick={clearSearchInputValue} secondary>
						{t('clear')}
					</Button>
					<Button
						onClick={() => {
							setIsCreateModalOpened(!isCreateModalOpened);
						}}
						secondary
						className={styles.createSprintButton}
					>
						{t('create_sprint')}
					</Button>
				</Container>

				<Container>{sprintList}</Container>
			</Container>
			<CreateSprintModal
				clickAction={() => {
					setIsCreateModalOpened(!isCreateModalOpened);
				}}
				isOpen={isCreateModalOpened}
			/>
		</>
	);
};

export default Scrum;
