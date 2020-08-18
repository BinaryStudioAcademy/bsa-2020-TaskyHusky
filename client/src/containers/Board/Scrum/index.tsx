import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Header, Container, Form, Button, InputOnChangeData, Icon } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs, BreadCrumbData } from './config/breadcrumbs';
import { useHistory, useParams } from 'react-router-dom';
import Sprint from 'components/Sprint';
import { startGettingProject } from 'containers/ProjectSettings/logic/actions';
import { extractUUIDFromArrayOfObjects } from 'helpers/extractUUIDFromArrayOfObjects.helper';

const Scrum: BoardComponent = (props) => {
	const dispatch = useDispatch();
	const scrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);
	const projectState = useSelector((rootState: RootState) => rootState.project.project);
	const { sprints } = scrumBoardState;
	const { id: projectId } = useParams();
	const history = useHistory();
	const { board } = props;
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');

	const projectDetails: BreadCrumbData = { id: projectState.id, name: projectState.name };
	const boardDetails: BreadCrumbData = { id: board.id, name: board.name };

	useEffect(() => {
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
		dispatch(startGettingProject({ id: projectId }));
		dispatch(actions.saveProjectIdToState({ projectId }));
		dispatch(actions.saveBoardIdToState({ boardId: board.id }));
	}, [dispatch, board.id, projectId]);

	useEffect(() => {
		if (scrumBoardState.sprints.length > 0) {
			const arrayOfIds = extractUUIDFromArrayOfObjects(scrumBoardState.sprints);
			arrayOfIds.forEach((id) => {
				dispatch(actions.loadIssuesTrigger({ sprintId: id }));
			});
		}
	}, [scrumBoardState.sprints.length, scrumBoardState.sprints, dispatch]);

	const sprintList =
		sprints.length > 0 ? (
			sprints.map((sprint) => {
				return <Sprint key={sprint.id} {...sprint} issues={scrumBoardState.matchIssueToSprint[sprint.id]} />;
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
					onChange={(event: SyntheticEvent, data: InputOnChangeData) => setSearch(data.value)}
					style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
				/>
				<Button onClick={() => setSearch('')} secondary>
					{t('clear')}
				</Button>
				<Button onClick={() => {}} secondary className={styles.createSprintButton}>
					{t('create_sprint')}
				</Button>
			</Container>

			<Container>{sprintList}</Container>
		</Container>
	);
};

export default Scrum;
