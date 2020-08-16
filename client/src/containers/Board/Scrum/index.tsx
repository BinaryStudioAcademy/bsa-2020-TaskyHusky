import React, { useState, useEffect } from 'react';
import { Header, Container, Form, Button, Breadcrumb, List, Divider } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch } from 'react-redux';

const Scrum: BoardComponent = (props) => {
	const dispatch = useDispatch();

	const { board } = props;
	const { t } = useTranslation();
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		dispatch(actions.loadSprintsTrigger({ boardId: board.id }));
	}, [dispatch, board.id]);

	return (
		<Container>
			<Container className={styles.breadcrumb}>
				<Breadcrumb>
					<Breadcrumb.Section href="/projects">{t('projects')}</Breadcrumb.Section>
					<Breadcrumb.Divider icon="right chevron" />
					<Breadcrumb.Section link>Test project name</Breadcrumb.Section>
					<Breadcrumb.Divider icon="right arrow" />
					<Breadcrumb.Section active>{board.name}</Breadcrumb.Section>
				</Breadcrumb>
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
