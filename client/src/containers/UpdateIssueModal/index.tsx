import React, { useState } from 'react';
import { Form, Modal, Button, Header, Icon, Divider } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import TagsInput from 'components/common/TagsInput';
import { useCreateIssueModalContext } from 'containers/CreateIssueModal/logic/context';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import { useTranslation } from 'react-i18next';
import { getUsername } from 'helpers/getUsername.helper';
import IssueFileInput from 'components/IssueFileInput';

interface Props {
	current: WebApi.Issue.PartialIssue;
	getOpenFunc: (open: () => void) => void;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	users: WebApi.Entities.UserProfile[];
	onSubmit?: (data: WebApi.Issue.PartialIssue) => void;
}

interface SelectOption {
	key: string | number;
	text: string | JSX.Element;
	value: string;
	style?: any;
}

const UpdateIssueModal: React.FC<Props> = ({ current, getOpenFunc, issueTypes, priorities, users, onSubmit }) => {
	const context = useCreateIssueModalContext();
	const [opened, setOpened] = useState<boolean>(false);
	const [isUploadPending, setIsUploadPending] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	getOpenFunc(() => setOpened(true));

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

	const usersOpts: SelectOption[] = users.map((user) => ({
		key: user.id,
		value: user.id,
		text: getUsername(user),
	}));

	const submit = async (event: React.FormEvent) => {
		event.preventDefault();
		const allFields = context.data.type && context.data.priority && context.data.summary;

		if (!allFields) {
			return;
		}

		const { watchers, ...data } = context.data;

		dispatch(
			updateIssue({
				// This field exists always
				id: current.id as string,
				data: data,
			}),
		);

		setOpened(false);

		if (onSubmit) {
			onSubmit(data);
		}
	};

	return (
		<Modal
			as="form"
			onSubmit={submit}
			open={opened}
			closeIcon
			closeOnDimmerClick
			closeOnEscape
			onClose={() => setOpened(false)}
			style={{ maxWidth: 700, height: '70%' }}
		>
			<Modal.Header>
				<Header as="h1">{t('edit_issue')}</Header>
			</Modal.Header>
			<Modal.Content scrolling style={{ maxHeight: '90%', height: '90%' }}>
				<Form
					as="div"
					onKeyDown={(event: React.KeyboardEvent) => event.key === 'Enter' && event.preventDefault()}
				>
					<Form.Field>
						<label className="required">{t('type')}</label>
						<Form.Dropdown
							clearable
							selection
							style={{ maxWidth: 200 }}
							options={typeOpts}
							defaultValue={current.type}
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
							defaultValue={current.priority}
							placeholder={t('priority')}
							onChange={(event, data) => context.set('priority', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('summary')}</label>
						<Form.Input
							placeholder={t('summary')}
							fluid
							defaultValue={current.summary}
							onChange={(event, data) => context.set('summary', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('labels')}</label>
						<Form.Dropdown
							clearable
							selection
							multiple
							placeholder={t('labels')}
							options={labelOpts}
							value={context.data.labels}
							onChange={(event, data) => context.set('labels', data.value)}
						/>
					</Form.Field>
					<Divider />
					<Form.Field>
						<label>{t('assigned')}</label>
						<Form.Dropdown
							clearable
							selection
							defaultValue={current.assigned}
							placeholder={t('assigned')}
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
						<IssueFileInput
							currentLinks={context.data.attachments}
							onChange={(newFiles) => context.set('attachments', newFiles)}
							onChangePending={(isPending) => setIsUploadPending(isPending)}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('description')}</label>
						<Form.TextArea
							placeholder={t('description')}
							defaultValue={current.description}
							onChange={(event, data) =>
								data ? context.set('description', data.value as string) : context.set('description', '')
							}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions style={{ height: 67 }}>
				<Button.Group floated="right">
					<Button primary type="submit" disabled={isUploadPending}>
						{t('submit')}
					</Button>
					<Button onClick={() => setOpened(false)} basic>
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
	users: state.users.users,
});

const labels: string[] = ['label', 'label1', 'label2'];

export default connect(mapStateToProps)(UpdateIssueModal);
