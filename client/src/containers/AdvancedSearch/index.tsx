import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Dropdown, Form, List, Icon } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import FilterDef from 'components/FilterDef';

const AdvancedSearch: React.FC = () => {
	const dispatch = useDispatch();
	const { filterDefs } = useSelector((rootState: RootState) => rootState.filterDefs);
	const issues = [
		{
			summary: 'Very summary',
			boardColumnID: '6d1',
			labels: 'done',
			attachments: 'attachments',
			links: 'link1',
			description: 'Very description',
			sprintID: '52ce',
			projectID: 'fc9e9ce',
			issueKey: 'TH-1',
			assignedID: 'b4e938e1',
			creatorID: 'a01d',
			type: {
				id: 'string',
				icon: 'string',
				color: 'string',
				title: 'string',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
		},
	];
	useEffect(() => {}, [dispatch]);

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>Search</h1>
						<Button compact basic className={styles.saveBtn}>
							Save as
						</Button>
					</div>
					<div className={styles.actionWrapper}>
						<List selection horizontal>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="share alternate" />
									<List.Content>Share</List.Content>
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="external share" />
									<List.Content>Export</List.Content>
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="ellipsis horizontal" />
								</div>
							</List.Item>
						</List>
					</div>
				</div>
				<div className={styles.bottomBarWrapper}>
					<Form>
						<Form.Group>
							{filterDefs.map((def) => (
								<FilterDef key={def.id} filterDef={def} />
							))}
							<div className={styles.moreField}>
								<Icon name="plus" color="blue" size="large" />
								More
							</div>
							<Form.Field control={Input} placeholder="Contains text" />
							<Button primary content="Search" />
							{/* <Form.Field control={Dropdown} placeholder="Owner" search selection options={[]} />
							<Form.Field control={Dropdown} placeholder="Project" search selection options={[]} />
							<Form.Field control={Dropdown} placeholder="Group" search selection options={[]} /> */}
						</Form.Group>
					</Form>
				</div>
			</div>
			<div>
				<Table selectable compact>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>T</Table.HeaderCell>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Summary</Table.HeaderCell>
							<Table.HeaderCell>Assignee</Table.HeaderCell>
							<Table.HeaderCell>Reporter</Table.HeaderCell>
							<Table.HeaderCell>P</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
							<Table.HeaderCell>Resolution</Table.HeaderCell>
							<Table.HeaderCell>Created</Table.HeaderCell>
							<Table.HeaderCell>Updated</Table.HeaderCell>
							<Table.HeaderCell> </Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{issues.map((issue) => (
							<IssueItem key={issue.id} issue={issue} />
						))}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default AdvancedSearch;
