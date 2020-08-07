import { IBoard } from '../types';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import React from 'react';
import styles from '../styles.module.scss';

interface Props {
	board: IBoard;
	setBoard: (board: IBoard) => void;
}

const ThirdMenuExisting = (props: Props) => {
	const projects = [
		{ key: 'project1', text: 'project1', value: 'project1' },
		{ key: 'project2', text: 'project2', value: 'project2' },
	];
	const personal = [
		{ key: 'person1', text: 'person1', value: 'person1' },
		{ key: 'person2', text: 'person2', value: 'person2' },
	];
	return (
		<Form>
			<Form.Field required width={5}>
				<label>Board name</label>
				<Input placeholder="Board name" />
			</Form.Field>
			<Form.Field required width={7} className={styles.formField}>
				<label>Project</label>
				{/*
 				// @ts-ignore*/}
				<Dropdown search header="Projects" multiple fluid selection options={projects} />
				<p>Select one or more projects to include in this board</p>
			</Form.Field>
			<Form.Field required width={7} className={styles.formField}>
				<label>Project</label>
				<Dropdown header="Projects" multiple fluid selection options={projects} />
				<p>Select one or more projects to include in this board</p>
			</Form.Field>
			<Form.Field required width={7} className={styles.formField}>
				{/*
 				// @ts-ignore*/}
				<Dropdown text="Shopping" multiple fluid search>
					<Dropdown.Menu>
						<Dropdown.Header>Categories</Dropdown.Header>
						<Dropdown.Item>Home Goods</Dropdown.Item>
						<Dropdown.Item>Bedroom</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Header>Order</Dropdown.Header>
						<Dropdown.Item>Status</Dropdown.Item>
						<Dropdown.Item>Cancellations</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Form.Field>
		</Form>
	);
};

export default ThirdMenuExisting;
