import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Header } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { ControlsGetter } from './logic/types';
import { createIssue } from 'services/issue.service';

interface Props {
	children: ControlsGetter;
}

interface SelectOption {
	key: string | number;
	value: any;
	text: string;
	style?: any;
}

const CreateIssueModalBody: React.FC<Props> = ({ children }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

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
		if (
			!Object.values(context.data)
				.map((v) => v)
				.reduce((a: boolean, b: boolean) => a && b, true)
		) {
			return;
		}
		setLoading(true);

		await createIssue({
			...(context.data as WebApi.Entities.Issue),
			boardColumnID: '6be0859b-05f6-447d-beb8-d5c324cc5043',
			sprintID: '4ae23ba4-9b4b-49c6-9892-991884505ff9',
			projectID: 'a7c26428-2978-4748-8d29-975ad423d8ef',
			issueKey: 'aaaaaa',
			assignedID: '98601c2c-a103-489b-b89f-ea5ae568b582',
			creatorID: 'f2235a1c-dfbc-47b7-bdb2-726d159c19a0',
		});

		setLoading(false);
		setIsOpened(false);
	};

	return (
		<Modal open={isOpened} closeIcon closeOnEscape closeOnDimmerClick onClose={getSetOpenFunc(false)}>
			<Grid className="fill" textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ marginTop: 20, marginBottom: 20, maxWidth: 300 }}>
					<Header color="blue">Add issue</Header>
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
							tags={context.data.links as string[]}
							onChange={(tags) => context.set('links', [...tags])}
						/>
						<TagsInput
							placeholder="Add attachment"
							tags={context.data.attachments as string[]}
							onChange={(tags) => context.set('attachments', [...tags])}
						/>
						<Form.TextArea
							placeholder="Description"
							onChange={(event, data) =>
								data ? context.set('description', data.value as string) : context.set('description', '')
							}
						/>
						<Button fluid positive type="submit" loading={loading}>
							Submit
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</Modal>
	);
};

const issueTypes: WebApi.Entities.IssueType[] = [
	{
		id: '45cb32e5-7ac4-4945-a80f-fe333f3dbf77',
		color: 'red',
		title: 'Not OK',
		icon: 'cross',
	},
	{
		id: '45cb32e5-7ac4-4945-a80f-fe333f3dbf77',
		color: 'green',
		title: 'OK',
		icon: 'check',
	},
];

const priorities: WebApi.Entities.Priority[] = [
	{
		id: '391def5c-df7e-423b-ad8d-517f6e8ac5b1',
		color: 'red',
		title: 'Not OK',
		icon: 'cross',
	},
	{
		id: '391def5c-df7e-423b-ad8d-517f6e8ac5b1',
		color: 'green',
		title: 'OK',
		icon: 'check',
	},
];

const labels: string[] = ['label1', 'label2'];

export default CreateIssueModalBody;
