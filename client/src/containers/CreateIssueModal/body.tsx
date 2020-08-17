import React, { useState } from 'react';
import { Modal, Form, Button, Header, Icon, Divider } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { createIssue } from 'pages/IssuePage/logic/actions';
import { generateRandomString } from 'helpers/randomString.helper';
import { KeyGenerate } from 'constants/KeyGenerate';
import { useTranslation } from 'react-i18next';
import { getUsername } from 'helpers/getUsername.helper';

interface Props {
	children: JSX.Element;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	boardColumnID?: string;
	projectID?: string;
	onClose?: (data: WebApi.Issue.PartialIssue) => void;
	projects: WebApi.Entities.Projects[];
	projectsLoading: boolean;
	users: WebApi.Entities.UserProfile[];
}

interface SelectOption {
	key: string | number;
	value: any;
	text: string | JSX.Element;
	style?: any;
}

const CreateIssueModalBody: React.FC<Props> = ({
	children,
	issueTypes,
	priorities,
	projects,
	projectsLoading,
	boardColumnID,
	onClose,
	projectID,
	users,
}) => {
	const { t } = useTranslation();
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const dispatch = useDispatch();
	const context = useCreateIssueModalContext();
	const user = useSelector((state: RootState) => state.auth.user);

	if (projectsLoading || !user) {
		return null;
	}

	const typeOpts: SelectOption[] = issueTypes.map((type) => ({
		key: type.id,
		value: type.id,
		text: (
			<>
				{type.icon ? <Icon name={type.icon as any} color={type.color as any} /> : ''}
				<span style={{ color: type.color }}>{type.title ?? 'untitled'}</span>
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
				{priority.icon ? <Icon name={priority.icon as any} color={priority.color as any} /> : ''}
				<span style={{ color: priority.color }}>{priority.title ?? 'untitled'}</span>
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

	const projectsOpts: SelectOption[] = projects.map((project) => ({
		key: project.id,
		value: project.id,
		text: project.name,
	}));

	const usersOpts: SelectOption[] = users.map((user) => ({
		key: user.id,
		value: user.id,
		text: getUsername(user),
	}));

	const getSetOpenFunc = (value: boolean) => () => setIsOpened(value);

	const submit = async (event: React.FormEvent) => {
		event.preventDefault();
		const projectCond = !projectID && !boardColumnID ? context.data.project : true;
		const allFields = context.data.type && context.data.summary && context.data.priority && projectCond;

		if (!allFields) {
			return;
		}

		const data = {
			...context.data,
			...(boardColumnID ? { boardColumn: boardColumnID } : {}),
			sprint: {
				id: '7dac8783-2421-4683-ae5d-d9adf0c75ecb',
				sprintName: 'Innovative Chipmunk Ferret',
				isActive: false,
				isCompleted: true,
			},
			project: projectID ?? context.data.project,
			issueKey: generateRandomString(KeyGenerate.LENGTH),
			assigned: context.data.assigned,
		};

		dispatch(createIssue({ data }));

		if (onClose) {
			onClose(data);
		}

		setIsOpened(false);
	};

	return (
		<Modal
			as="form"
			onSubmit={submit}
			open={isOpened}
			closeIcon
			closeOnEscape
			closeOnDimmerClick
			onClose={getSetOpenFunc(false)}
			openOnTriggerClick
			trigger={<div onClick={getSetOpenFunc(true)}>{children}</div>}
			style={{ maxWidth: 700, height: '70%' }}
		>
			<Modal.Header>
				<Header as="h1">{t('create_issue')}</Header>
			</Modal.Header>
			<Modal.Content scrolling style={{ maxHeight: '90%', height: '90%' }}>
				<Form as="div">
					<Form.Field>
						<label className="required">{t('type')}</label>
						<Form.Dropdown
							clearable
							selection
							style={{ maxWidth: 200 }}
							options={typeOpts}
							placeholder={t('type')}
							onChange={(event, data) => context.set('type', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('priority')}</label>
						<Form.Dropdown
							clearable
							selection
							style={{ maxWidth: 200 }}
							options={priorityOpts}
							placeholder={t('priority')}
							onChange={(event, data) => context.set('priority', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('summary')}</label>
						<Form.Input
							placeholder={t('summary')}
							fluid
							onChange={(event, data) => context.set('summary', data.value)}
						/>
					</Form.Field>
					{!projectID && !boardColumnID ? (
						<Form.Field>
							<label className="required">{t('project')}</label>
							<Form.Dropdown
								selection
								placeholder={t('project')}
								options={projectsOpts}
								onChange={(event, data) => context.set('project', data.value)}
							/>
						</Form.Field>
					) : (
						''
					)}
					<Form.Field>
						<label>{t('labels')}</label>
						<Form.Dropdown
							clearable
							selection
							multiple
							placeholder={t('labels')}
							options={labelOpts}
							onChange={(event, data) => context.set('labels', data.value)}
						/>
					</Form.Field>
					<Divider />
					<Form.Field>
						<label>{t('assignee')}</label>
						<Form.Dropdown
							clearable
							selection
							placeholder={t('assignee')}
							options={usersOpts}
							onChange={(event, data) => context.set('assigned', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('links')}</label>
						<TagsInput
							placeholder={t('add_link')}
							tags={context.data.links ?? []}
							onChange={(tags) => context.set('links', [...tags])}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('attachments')}</label>
						<TagsInput
							placeholder={t('add_attachment')}
							tags={context.data.attachments ?? []}
							onChange={(tags) => context.set('attachments', [...tags])}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('description')}</label>
						<Form.TextArea
							placeholder={t('description')}
							onChange={(event, data) =>
								data ? context.set('description', data.value as string) : context.set('description', '')
							}
							rows={10}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions style={{ height: 67 }}>
				<Button.Group floated="right">
					<Button primary type="submit">
						{t('submit')}
					</Button>
					<Button onClick={getSetOpenFunc(false)} basic>
						<span>{t('cancel')}</span>
					</Button>
				</Button.Group>
			</Modal.Actions>
		</Modal>
	);
};

const mapStateToProps = (state: RootState) => ({
	issueTypes: state.issues.types,
	priorities: state.issues.priorities,
	projects: state.projects.projects,
	projectsLoading: state.projects.isLoading,
	users: state.users.users,
});

const labels: string[] = ['label1', 'label2'];

export default connect(mapStateToProps)(CreateIssueModalBody);
