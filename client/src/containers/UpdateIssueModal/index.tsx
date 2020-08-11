import React, { useState } from 'react';
import { Form, Modal, Button, Header, Grid, Icon, Divider } from 'semantic-ui-react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import TagsInput from 'components/common/TagsInput';
import { useCreateIssueModalContext } from 'containers/CreateIssueModal/logic/context';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
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
		<Modal
			open={opened}
			closeIcon
			closeOnDimmerClick
			closeOnEscape
			onClose={() => setOpened(false)}
			style={{ maxWidth: 700 }}
		>
			<Modal.Header>
				<Header color="blue" as="h1">
					{t('edit_issue')}
				</Header>
			</Modal.Header>
			<Grid className="fill" verticalAlign="middle">
				<Grid.Column style={{ marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
					<Form
						onSubmit={submit}
						onKeyDown={(event: React.KeyboardEvent) => event.key === 'Enter' && event.preventDefault()}
					>
						<Form.Field>
							<label className="required">{t('type')}</label>
							<Form.Dropdown
								clearable
								selection
								style={{ maxWidth: 200 }}
								options={typeOpts}
								defaultValue={current.type.id}
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
								defaultValue={current.priority.id}
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
								style={{ maxWidth: 200 }}
								multiple
								placeholder={t('labels')}
								options={labelOpts}
								defaultValue={current.labels as any}
								onChange={(event, data) => context.set('labels', data.value)}
							/>
						</Form.Field>
						<Divider />
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
								defaultValue={current.description}
								onChange={(event, data) =>
									data
										? context.set('description', data.value as string)
										: context.set('description', '')
								}
							/>
						</Form.Field>
						<Button.Group floated="right">
							<Button primary type="submit" loading={loading}>
								{t('submit')}
							</Button>
							<Button onClick={() => setOpened(false)} basic>
								<span>{t('cancel')}</span>
							</Button>
						</Button.Group>
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
