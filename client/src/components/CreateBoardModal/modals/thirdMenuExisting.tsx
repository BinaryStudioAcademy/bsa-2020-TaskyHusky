import { IBoard } from '../types';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../typings/rootState';

interface Props {
	board: IBoard;
	setBoard: (board: IBoard) => void;
	changeSubmitStatus: (status: boolean) => void;
}

const ThirdMenuExisting = (props: Props) => {
	const [selectedLocation, setSelectedLocation] = useState(' ');
	const [selectedName, setSelectedName] = useState(' ');
	const [selectedProject, setSelectedProject] = useState([]);

	const authData = useSelector((rootState: RootState) => rootState.auth);
	const initials = `${authData.user?.firstName} ${authData.user?.lastName}`;
	const projectData = useSelector((rootState: RootState) => rootState.projects.projects);

	const projects = [
		{ key: 'project1', text: 'project1', value: 'project1' },
		{ key: 'project2', text: 'project2', value: 'project2' },
	];
	const personal = [
		{
			key: `${initials === ' ' ? 'Kostya Tsymbal' : initials}`,
			text: `${initials === ' ' ? 'Kostya Tsymbal' : initials}`,
			value: `${initials === ' ' ? 'Kostya Tsymbal' : initials}`,
		},
	];

	function checkAllFieldsStatus() {
		console.log(projectData);
	}

	return (
		<Form>
			<Form.Field required width={5}>
				<label>Board name</label>
				<Input
					placeholder="Board name"
					onChange={(e, data) => {
						setSelectedName(data.value);
						checkAllFieldsStatus();
					}}
				/>
			</Form.Field>
			<Form.Field required width={7} className={styles.formField}>
				<label>Project</label>
				{/*
 				// @ts-ignore*/}
				<Dropdown search header="Projects" multiple fluid selection options={projects} />
				<p>Select one or more projects to include in this board</p>
			</Form.Field>
			<Form.Field required width={7} className={styles.formField}>
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
										setSelectedLocation(option.value);
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
									onClick={() => setSelectedLocation(option.value)}
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
