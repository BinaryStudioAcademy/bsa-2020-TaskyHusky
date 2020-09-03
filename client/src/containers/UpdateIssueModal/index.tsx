import React, { useState } from 'react';
import { Form, Modal, Button, Header, Icon, Divider, InputOnChangeData } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import TagsInput from 'components/common/TagsInput';
import { useCreateIssueModalContext } from 'containers/CreateIssueModal/logic/context';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import { useTranslation } from 'react-i18next';
import { getUsername } from 'helpers/getUsername.helper';
import { isNumber } from 'util';
import { IssueConstants } from 'constants/Issue';
import IssueFileInput from 'components/IssueFileInput';
import { initialState } from 'containers/CreateIssueModal/logic/initalState';

const labels: string[] = ['label', 'label1', 'label2'];
interface Props {
	current: WebApi.Issue.PartialIssue;
	getOpenFunc: (open: () => void) => void;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	statuses: WebApi.Entities.IssueStatus[];
	users: WebApi.Entities.UserProfile[];
	onSubmit?: (data: WebApi.Issue.PartialIssue) => void;
}

interface SelectOption {
	key: string | number;
	text: string | JSX.Element;
	value: string;
	style?: any;
}

const UpdateIssueModal: React.FC<Props> = ({
	current,
	getOpenFunc,
	issueTypes,
	priorities,
	users,
	onSubmit,
	statuses,
}) => {
	const context = useCreateIssueModalContext();
	const [opened, setOpened] = useState<boolean>(false);
	const [attachments, setAttachments] = useState<File[]>([]);
	const [isStoryPointValid, setIsStoryPointValid] = useState(true);
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

	const statusesOpts: SelectOption[] = statuses.map(({ id, title, color }) => ({
		key: id,
		value: id,
		text: (
			<>
				<span style={{ color: color, fontWeight: 'bold' }}>{title ?? 'untitled'}</span>
			</>
		),
	}));

	const submit = async (event: React.FormEvent) => {
		event.preventDefault();
		const allFields = context.data.type && context.data.priority && context.data.summary;

		if (!allFields || !isStoryPointValid) {
			return;
		}

		const { watchers, ...data } = context.data;

		dispatch(
			updateIssue({
				// This field exists always
				id: current.id as string,
				data: data,
				files: attachments,
			}),
		);

		setOpened(false);

		if (onSubmit) {
			onSubmit(data);
		}
	};

	const handleStoryPointChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;
		const number = parseInt(value, 10);
		if (value.length === 0) {
			context.set('storyPoint', value);
			setIsStoryPointValid(true);
			return;
		}
		if (isNumber(number) && number <= IssueConstants.maxStoryPoint && number >= IssueConstants.minStoryPoint) {
			context.set('storyPoint', value);
			setIsStoryPointValid(true);
		} else {
			setIsStoryPointValid(false);
		}
	};
	const clearContext = () => {
		// Can't do it without any
		Object.keys(context.data).forEach((key) => context.set(key as any, (initialState as any)[key]));
	};

	return (
		<Modal
			as="form"
			onSubmit={submit}
			open={opened}
			closeOnDimmerClick
			closeOnEscape
			onOpen={clearContext}
			onClose={() => setOpened(false)}
			style={{ maxWidth: 700, height: '70%' }}
			dimmer="inverted"
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
						<label className="required">{t('Status')}</label>
						<Form.Dropdown
							clearable
							selection
							style={{ maxWidth: 200 }}
							options={statusesOpts}
							defaultValue={current.status}
							placeholder={t('Status')}
							onChange={(event, data) => context.set('status', data.value)}
						/>
					</Form.Field>
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
						<label>{t('story_point')}</label>
						<Form.Input
							type="number"
							error={!isStoryPointValid}
							placeholder={t('story_point')}
							fluid
							defaultValue={current.storyPoint}
							onChange={handleStoryPointChange}
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
							currentFiles={attachments}
							onChange={(newFiles) => setAttachments(newFiles)}
							onDeleteAlreadyAttached={(newLinks) => context.set('attachments', newLinks)}
							alreadyAttached={context.data.attachments}
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
				<div style={{ float: 'right' }}>
					<Button className="primaryBtn" type="submit">
						{t('submit')}
					</Button>
					<Button onClick={() => setOpened(false)} className="cancelBtn" compact>
						{t('cancel')}
					</Button>
				</div>
			</Modal.Actions>
		</Modal>
	);
};

const mapStateToProps = (state: RootState) => ({
	issueTypes: state.issues.types,
	priorities: state.issues.priorities,
	statuses: state.issues.statuses,
	users: state.users.users,
});

export default connect(mapStateToProps)(UpdateIssueModal);
