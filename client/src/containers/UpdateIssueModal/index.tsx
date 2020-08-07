import React, { useState } from 'react';
import { Form, Modal, Button, Header, Grid, Icon } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import TagsInput from 'components/common/TagsInput';
import { useCreateIssueModalContext } from 'containers/CreateIssueModal/logic/context';
import { updateIssue } from 'pages/CreateIssue/logic/actions';

interface Props {
	current: WebApi.Result.IssueResult;
	getOpenFunc: (open: () => void) => void;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	onSubmit: () => void;
}

interface SelectOption {
	key: string | number;
	text: string | JSX.Element;
	value: string;
	style?: any;
}

const UpdateIssueModal: React.FC<Props> = ({ current, getOpenFunc, issueTypes, priorities, onSubmit }) => {
	const context = useCreateIssueModalContext();
	const [opened, setOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	getOpenFunc(() => setOpened(true));

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

	const submit = async () => {
		const allFields = context.data.type && context.data.priority && context.data.summary;

		if (!allFields) {
			return;
		}

		setLoading(true);

		dispatch(
			updateIssue({
				id: current.id,
				data: { ...context.data },
			}),
		);

		setLoading(false);
		setOpened(false);
		onSubmit();
	};

	return (
		<Modal open={opened} closeIcon closeOnDimmerClick closeOnEscape size="tiny">
			<Modal.Header>
				<Header color="blue" as="h1">
					Edit issue
				</Header>
			</Modal.Header>
			<Grid className="fill" textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ marginTop: 20, marginBottom: 20, maxWidth: 400 }}>
					<Form
						onSubmit={submit}
						onKeyDown={(event: React.KeyboardEvent) => event.key === 'Enter' && event.preventDefault()}
					>
						<Form.Dropdown
							clearable
							selection
							fluid
							options={typeOpts}
							defaultValue={current.type.id}
							placeholder="Type"
							onChange={(event, data) => context.set('type', data.value)}
						/>
						<Form.Dropdown
							clearable
							selection
							fluid
							options={priorityOpts}
							defaultValue={current.priority.id}
							placeholder="Priority"
							onChange={(event, data) => context.set('priority', data.value)}
						/>
						<Form.Input
							placeholder="Summary"
							fluid
							defaultValue={current.summary}
							onChange={(event, data) => context.set('summary', data.value)}
						/>
						<Form.Dropdown
							clearable
							selection
							fluid
							multiple
							placeholder="Labels"
							options={labelOpts}
							defaultValue={current.labels as any}
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
							defaultValue={current.description}
							onChange={(event, data) =>
								data ? context.set('description', data.value as string) : context.set('description', '')
							}
						/>
						<Button floated="left" positive type="submit" loading={loading}>
							Submit
						</Button>
						<Button floated="right" onClick={() => setOpened(false)}>
							Cancel
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</Modal>
	);
};

const mapStateToProps = (state: RootState) => ({
	issueTypes: state.issues.types,
	priorities: state.issues.priorities,
});

const labels: string[] = ['label1', 'label2'];

export default connect(mapStateToProps)(UpdateIssueModal);
