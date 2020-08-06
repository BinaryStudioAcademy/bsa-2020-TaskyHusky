import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Header } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { ControlsGetter } from './logic/types';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Redirect } from 'react-router-dom';
import { createIssue } from 'pages/CreateIssue/logic/actions';

interface Props {
	children: ControlsGetter;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
}

interface SelectOption {
	key: string | number;
	value: any;
	text: string;
	style?: any;
}

const CreateIssueModalBody: React.FC<Props> = ({ children, issueTypes, priorities }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [redirecting, setRedirecting] = useState<boolean>(false);
	const dispatch = useDispatch();

	const typeOpts: SelectOption[] = issueTypes.map((type) => ({
		key: type.id,
		value: type.id,
		text: type.title ?? 'untitled',
		style: {
			color: type.color ?? 'white',
		},
	}));

	const priorityOpts: SelectOption[] = priorities.map((priority) => ({
		key: priority.id,
		value: priority.id,
		text: priority.title ?? 'untitled',
		style: {
			color: priority.color ?? 'white',
		},
	}));

	const labelOpts: SelectOption[] = labels.map((label, i) => ({
		key: i,
		value: label,
		text: label,
	}));

	const context = useCreateIssueModalContext();
	const searchFunc = (opts: any[], value: string) => opts.filter((o) => o.text.toString().includes(value));

	const getSetOpenFunc = (value: boolean) => () => setIsOpened(value);
	children(getSetOpenFunc(true), getSetOpenFunc(false));

	const submit = async () => {
		const allFields = Object.values(context.data)
			.map((v) => v)
			.reduce((a: boolean, b: boolean) => a && b, true);

		if (!allFields) {
			return;
		}

		setLoading(true);

		dispatch(
			createIssue({
				data: {
					...(context.data as WebApi.Entities.Issue),
					boardColumnID: '6be0859b-05f6-447d-beb8-d5c324cc5043',
					sprint: {
						id: '0a9060e2-a0ad-4645-9878-820ed39e4546',
						sprintName: '4',
						isActive: false,
						isCompleted: true,
					},
					project: {
						id: '48a31606-c818-4005-856a-8c3d3fb6dde7',
						name: '1',
						key: '1',
						projectType: '1',
						category: '1',
						defaultAssigneeID: '578e97ce-401d-41ba-aa19-73ad715b9c36',
						leadID: 'b46f8d0f-f43b-4911-9d12-38702c1f9c63',
						creatorID: 'bd663b74-cd70-4c16-add2-d8eb3df743a7',
					},
					issueKey: 'aaaaaa',
					assignedID: '98601c2c-a103-489b-b89f-ea5ae568b582',
					creatorID: 'f2235a1c-dfbc-47b7-bdb2-726d159c19a0',
				},
			}),
		);

		setLoading(false);
		setIsOpened(false);
		setRedirecting(true);
	};

	return (
		<>
			{redirecting ? <Redirect to="/" /> : ''}
			<Modal
				open={isOpened}
				closeIcon
				closeOnEscape
				closeOnDimmerClick
				onClose={getSetOpenFunc(false)}
				dimmer="inverted"
				size="tiny"
			>
				<Modal.Header>
					<Header color="blue">Add issue</Header>
				</Modal.Header>
				<Grid className="fill" textAlign="center" verticalAlign="middle">
					<Grid.Column style={{ marginTop: 20, marginBottom: 20, maxWidth: 400 }}>
						<Form onSubmit={submit}>
							<Form.Dropdown
								clearable
								selection
								fluid
								options={typeOpts}
								placeholder="Type"
								onChange={(event, data) => context.set('type', data.value)}
								search={searchFunc}
							/>
							<Form.Dropdown
								clearable
								selection
								fluid
								options={priorityOpts}
								placeholder="Priority"
								onChange={(event, data) => context.set('priority', data.value)}
								search={searchFunc}
							/>
							<Form.Input
								placeholder="Summary"
								fluid
								onChange={(event, data) => context.set('summary', data.value)}
							/>
							<Form.Dropdown
								clearable
								selection
								fluid
								multiple
								placeholder="Labels"
								options={labelOpts}
								search={searchFunc}
								onChange={(event, data) => context.set('labels', data.value)}
							/>
							<TagsInput
								placeholder="Add link"
								tags={context.data.links ?? []}
								onChange={(tags) => context.set('links', [...tags])}
							/>
							<TagsInput
								placeholder="Add attachment"
								tags={context.data.attachments ?? []}
								onChange={(tags) => context.set('attachments', [...tags])}
							/>
							<Form.TextArea
								placeholder="Description"
								onChange={(event, data) =>
									data
										? context.set('description', data.value as string)
										: context.set('description', '')
								}
							/>
							<Button floated="left" positive type="submit" loading={loading}>
								Submit
							</Button>
							<Button floated="right" onClick={getSetOpenFunc(false)}>
								Cancel
							</Button>
						</Form>
					</Grid.Column>
				</Grid>
			</Modal>
		</>
	);
};

const mapStateToProps = (state: RootState) => ({
	issueTypes: state.issues.types,
	priorities: state.issues.priorities,
});

const labels: string[] = ['label1', 'label2'];

export default connect(mapStateToProps)(CreateIssueModalBody);
