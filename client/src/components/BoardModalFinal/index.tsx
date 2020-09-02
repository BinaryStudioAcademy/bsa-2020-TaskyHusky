import { IBoard } from '../../typings/boardTypes';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import * as actions from '../../containers/Projects/logic/actions';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	board: IBoard;
	setBoard: (board: IBoard) => void;
	setCreateButtonDisabled: (status: boolean) => void;
}

const BoardModalFinal = (props: Props) => {
	const { t } = useTranslation();
	const { board, setBoard, setCreateButtonDisabled } = props;
	const { boardType, algorithm } = board;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.startLoading());
	}, [dispatch]);

	const [selectedName, setSelectedName] = useState('');
	const [selectedProjects, setSelectedProjects] = useState<Array<string>>([]);
	const authData = useSelector((rootState: RootState) => rootState.auth);

	useEffect(() => {
		const isCreateButtonHidden = selectedProjects.length === 0 || selectedName === '';

		if (!isCreateButtonHidden) {
			setBoard({
				algorithm,
				boardType,
				projects: [...selectedProjects],
				name: selectedName,
				admin: authData.user?.id,
			});
		}

		setCreateButtonDisabled(isCreateButtonHidden);
	}, [selectedProjects, selectedName, authData.user, setBoard, setCreateButtonDisabled, algorithm, boardType]);

	const projectData = useSelector((rootState: RootState) => rootState.projects.projects);

	const projects = projectData.map((project) => ({
		key: project.id,
		text: `${project.name} (${project.key})`,
		value: project.id,
	}));

	return (
		<Form>
			<Form.Field width={5}>
				<label>{t('board_name')}</label>
				<Input
					placeholder={t('board_name')}
					onChange={(e, data) => {
						setSelectedName(data.value);
					}}
				/>
			</Form.Field>
			<Form.Field width={7} className={styles.formField}>
				<label>{t('project')}</label>
				<Dropdown
					search={(options, query) =>
						options.filter((option) => (option.text as string).toLowerCase().includes(query.toLowerCase()))
					}
					header={t('projects')}
					multiple
					fluid
					selection
					options={projects}
					onChange={(e, data) => {
						setSelectedProjects([...(data.value as string[])]);
					}}
				/>
				<p>{t('create_board_final_text')}</p>
			</Form.Field>
		</Form>
	);
};

export default BoardModalFinal;
