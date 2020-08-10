import { IBoard } from '../types';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../typings/rootState';
import * as actions from '../../../containers/Projects/logic/actions';

interface Props {
	board: IBoard;
	setBoard: (board: IBoard) => void;
	changeSubmitStatus: (status: boolean) => void;
}

const ThirdMenuExisting = (props: Props) => {
	const { board, setBoard } = props;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.startLoading());
	}, []);

	const [selectedName, setSelectedName] = useState('');
	const [selectedProjects, setSelectedProjects] = useState<Array<string>>([]);
	useEffect(() => {
		if (selectedProjects.length !== 0 && selectedName !== '' && selectedLocation !== '') {
			props.changeSubmitStatus(false);
			setBoard({
				...board,
				projects: [...selectedProjects],
				name: selectedName,
				admin: authData.user?.id,
			});
		} else {
			props.changeSubmitStatus(true);
		}
	}, [selectedProjects, selectedName]);

	const authData = useSelector((rootState: RootState) => rootState.auth);
	const initials = `${authData.user?.firstName} ${authData.user?.lastName}`;
	const projectData = useSelector((rootState: RootState) => rootState.projects.projects);

	const projects = projectData.map((project) => ({
		key: project.id,
		text: `${project.name} (${project.key})`,
		value: project.id,
	}));

	const personal = [
		{
			key: authData.user?.id,
			text: initials,
			value: `${authData.user ? authData.user.id : 'fakeId'}`,
		},
	];

	return (
		<Form>
			<Form.Field width={5}>
				<label>Board name</label>
				<Input
					placeholder="Board name"
					onChange={(e, data) => {
						setSelectedName(data.value);
					}}
				/>
			</Form.Field>
			<Form.Field width={7} className={styles.formField}>
				<label>Project</label>
				{/*
 				// @ts-ignore*/}
				<Dropdown
					search
					header="Projects"
					multiple
					fluid
					selection
					options={projects}
					onChange={(e, data) => {
						setSelectedProjects([...(data.value as string[])]);
					}}
				/>
				<p>Select one or more projects to include in this board</p>
			</Form.Field>
			<Form.Field width={7} className={styles.formField}>
				<label>Location</label>
				{/*
 				// @ts-ignore*/}
				<Dropdown value={selectedLocation} text={selectedLocation} search className="selection">
					<Dropdown.Menu>
						<Dropdown.Header content="Projects" />
						<Dropdown.Menu scrolling>
							{projects.map((option) => (
								<Dropdown.Item
									{...option}
									key={option.key}
									onClick={() => {
										setSelectedLocation(option.text);
									}}
								/>
							))}
						</Dropdown.Menu>
						<Dropdown.Header content="Personal" />
						<Dropdown.Menu scrolling>
							{personal.map((option) => (
								<Dropdown.Item
									{...option}
									key={option.key}
									onClick={() => {
										setSelectedLocation(option.text);
									}}
								/>
							))}
						</Dropdown.Menu>
					</Dropdown.Menu>
				</Dropdown>
			</Form.Field>
		</Form>
	);
};

export default ThirdMenuExisting;
