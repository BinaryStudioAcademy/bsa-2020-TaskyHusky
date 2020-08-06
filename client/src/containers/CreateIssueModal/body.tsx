import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Header, Icon } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { ControlsGetter } from './logic/types';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Redirect } from 'react-router-dom';
import { createIssue } from 'pages/CreateIssue/logic/actions';
import { generateRandomString } from 'helpers/randomString.helper';
import { KeyGenerate } from 'constants/KeyGenerate';

interface Props {
	children: ControlsGetter;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
}

interface SelectOption {
	key: string | number;
	value: any;
	text: string | JSX.Element;
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
		text: (
			<>
				{type.icon ? <Icon name={type.icon as any} /> : ''}
				{type.title ?? 'untitled'}
			</>
		),
		style: {
			color: type.color ?? 'white',
		},
	}));

	const priorityOpts: SelectOption[] = priorities.map((priority) => ({
		key: priority.id,
		value: priority.id,
		text: (
			<>
				{priority.icon ? <Icon name={priority.icon as any} /> : ''}
				{priority.title ?? 'untitled'}
			</>
		),
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

	const getSetOpenFunc = (value: boolean) => () => setIsOpened(value);
	children(getSetOpenFunc(true), getSetOpenFunc(false));

	const submit = async () => {
		const allFields = context.data.type && context.data.priority && context.data.summary;

		if (!allFields) {
			return;
		}

		setLoading(true);

		dispatch(
			createIssue({
				data: {
					...(context.data as WebApi.Entities.Issue),
					boardColumnID: '6be0859b-05f6-447d-beb8-d5c324cc5043',
					sprintID: '4ae23ba4-9b4b-49c6-9892-991884505ff9',
					projectID: 'a7c26428-2978-4748-8d29-975ad423d8ef',
					issueKey: generateRandomString(KeyGenerate.LENGTH),
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
							/>
							<Form.Dropdown
								clearable
								selection
								fluid
								options={priorityOpts}
								placeholder="Priority"
								onChange={(event, data) => context.set('priority', data.value)}
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
