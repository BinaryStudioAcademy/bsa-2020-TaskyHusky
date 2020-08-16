import React, { useState, useEffect } from 'react';
import { Header, Container, Form, Button, Breadcrumb, List, Divider } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';

const Scrum: BoardComponent = (props) => {
	const dispatch = useDispatch();
	const scrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);

	const history = useHistory();
	const { board } = props;
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');

	const projectDetails: Partial<WebApi.Entities.Projects> = { id: '', name: '' };

	const boardDetails: Partial<WebApi.Entities.Board> = { id: board.id, name: board.name };

	if (scrumBoardState.sprints.length > 0 && scrumBoardState.sprints[0].project) {
		const { id, name } = scrumBoardState.sprints[0].project;
		projectDetails.id = id;
		projectDetails.name = name;
	}

	useEffect(() => {
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
	}, [dispatch, board.id]);

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
					onChange={(event, data) => setSearch(data.value)}
					style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
				/>
				<Button onClick={() => setSearch('')} secondary>
					{t('clear')}
				</Button>
			</Container>

			<Container>
				<Divider></Divider>

				<List horizontal>
					<List.Item>
						<List.Content>
							<List.Header>SPRINT.NAME</List.Header>
							SPRINT.ISACTIVE
						</List.Content>
					</List.Item>

					<List.Item>
						<List.Content>
							<List.Header>SPRINT EDIT BUTTON</List.Header>
						</List.Content>
					</List.Item>
				</List>

				<List celled verticalAlign="middle">
					<List.Item>
						<List.Content floated="left">TASK ICON</List.Content>
						<List.Content floated="left">
							<List.Header>ISSUE TITLE</List.Header>
						</List.Content>
						<List.Content floated="right">PRIORITY</List.Content>
						<List.Content floated="right">KEY</List.Content>
						<List.Content floated="right">ASSIGNEE</List.Content>
					</List.Item>

					<List.Item>
						<List.Content floated="left">TASK ICON</List.Content>
						<List.Content floated="left">
							<List.Header>ISSUE TITLE</List.Header>
						</List.Content>
						<List.Content floated="right">PRIORITY</List.Content>
						<List.Content floated="right">KEY</List.Content>
						<List.Content floated="right">ASSIGNEE</List.Content>
					</List.Item>

					<List.Item>
						<List.Content floated="left">TASK ICON</List.Content>
						<List.Content floated="left">
							<List.Header>ISSUE TITLE</List.Header>
						</List.Content>
						<List.Content floated="right">PRIORITY</List.Content>
						<List.Content floated="right">KEY</List.Content>
						<List.Content floated="right">ASSIGNEE</List.Content>
					</List.Item>

					<List.Item>
						<List.Content floated="left">TASK ICON</List.Content>
						<List.Content floated="left">
							<List.Header>ISSUE TITLE</List.Header>
						</List.Content>
						<List.Content floated="right">PRIORITY</List.Content>
						<List.Content floated="right">KEY</List.Content>
						<List.Content floated="right">ASSIGNEE</List.Content>
					</List.Item>
				</List>
			</Container>
		</Container>
	);
};

export default Scrum;
