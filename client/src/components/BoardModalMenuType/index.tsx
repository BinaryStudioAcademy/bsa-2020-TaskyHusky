import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { boardTypes } from '../../typings/boardTypes';
import React from 'react';
import styles from './styles.module.scss';

interface Props {
	onTypeSelection: (type: boardTypes) => void;
}

const BoardModalMenuType = (props: Props) => {
	const { t } = useTranslation();

	return (
		<Grid columns={2} relaxed="very" divided>
			<Grid.Row>
				<Grid.Column>
					<Container>
						<Header as="h2">{t('scrum')}</Header>
						<p>{t('scrum_focuses_on_planning')}</p>
					</Container>
				</Grid.Column>
				<Grid.Column>
					<Container>
						<Header as="h2">{t('kanban')}</Header>
						<p>{t('kanban_focuses_on_planning')}</p>
					</Container>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column className={styles.buttonContainer}>
					<Button onClick={() => props.onTypeSelection(boardTypes.scrum)} basic className={styles.createBtn}>
						{t('create_scrum_board')}
					</Button>
				</Grid.Column>
				<Grid.Column className={styles.buttonContainer}>
					<Button onClick={() => props.onTypeSelection(boardTypes.kanban)} basic className={styles.createBtn}>
						{t('create_kanban_board')}
					</Button>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default BoardModalMenuType;
