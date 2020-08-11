import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Header, Icon, Divider } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { createIssue } from 'pages/IssuePage/logic/actions';
import { generateRandomString } from 'helpers/randomString.helper';
import { KeyGenerate } from 'constants/KeyGenerate';
import { useTranslation } from 'react-i18next';

interface Props {
	children: JSX.Element;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	boardColumnID?: string;
	projectID?: string;
	onClose?: () => void;
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
	boardColumnID,
	onClose,
	projectID,
}) => {
	const { t } = useTranslation();
	const [isOpened, setIsOpened] = useState<boolean>(false);
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

	const submit = async () => {
		const allFields = context.data.type && context.data.summary && context.data.priority;

		if (!allFields) {
			return;
		}

		dispatch(
			createIssue({
				data: {
					...context.data,
					...(boardColumnID ? { boardColumn: boardColumnID } : {}),
					sprint: {
						id: '7dac8783-2421-4683-ae5d-d9adf0c75ecb',
						sprintName: 'Innovative Chipmunk Ferret',
						isActive: false,
						isCompleted: true,
					},
					...(projectID ? { project: projectID } : {}),
					issueKey: generateRandomString(KeyGenerate.LENGTH),
					assignedID: '98601c2c-a103-489b-b89f-ea5ae568b582',
					creatorID: 'f2235a1c-dfbc-47b7-bdb2-726d159c19a0',
				},
			}),
		);

		if (onClose) {
			onClose();
		}

		setIsOpened(false);
	};

	return (
		<>
			<Modal
				open={isOpened}
				closeIcon
				closeOnEscape
				closeOnDimmerClick
				onClose={getSetOpenFunc(false)}
				openOnTriggerClick
				trigger={<div onClick={getSetOpenFunc(true)}>{children}</div>}
				style={{ maxWidth: 700 }}
			>
				<Grid className="fill" verticalAlign="middle">
					<Grid.Column style={{ marginTop: 20, marginBottom: 20, marginLeft: 20 }}>
						<Header floated="left" as="h1" style={{ marginBottom: 20 }}>
							{t('create_issue')}
						</Header>
						<Form onSubmit={submit}>
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
								<Form.Field>
									<label className="required">{t('priority')}</label>
								</Form.Field>
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
							<Form.Field>
								<label>{t('labels')}</label>
								<Form.Dropdown
									clearable
									selection
									multiple
									style={{ maxWidth: 200 }}
									placeholder={t('labels')}
									options={labelOpts}
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
									onChange={(event, data) =>
										data
											? context.set('description', data.value as string)
											: context.set('description', '')
									}
									rows={10}
								/>
							</Form.Field>
							<Button.Group floated="right">
								<Button primary type="submit">
									{t('submit')}
								</Button>
								<Button onClick={getSetOpenFunc(false)} basic>
									<span>{t('cancel')}</span>
								</Button>
							</Button.Group>
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
