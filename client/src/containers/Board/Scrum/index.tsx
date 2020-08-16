import React, { useState, useEffect } from 'react';
import { Header, Container, Form, Button } from 'semantic-ui-react';
import { BoardComponent } from '../';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import * as actions from './logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import Breadcrumbs from 'components/common/Breadcrumbs';
import { setBreadcrumbs } from './config/breadcrumbs';
import { useHistory } from 'react-router-dom';
import Sprint from 'components/Sprint';

const Scrum: BoardComponent = (props) => {
	const dispatch = useDispatch();
	const scrumBoardState = useSelector((rootState: RootState) => rootState.scrumBoard);
	const { sprints } = scrumBoardState;

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

	const sprintList =
		sprints.length > 0 ? (
			sprints.map((sprint) => <Sprint key={sprint.id} {...sprint} />)
		) : (
			<span>Create Sprint Button</span>
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
					onChange={(event, data) => setSearch(data.value)}
					style={{ marginLeft: 20, marginRight: 60, maxWidth: 250 }}
				/>
				<Button onClick={() => setSearch('')} secondary>
					{t('clear')}
				</Button>
			</Container>

			<Container>{sprintList}</Container>
		</Container>
	);
};

export default Scrum;
