import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useBoardColumnContext } from './logic/context';
import { useDispatch } from 'react-redux';
import { createColumn } from 'containers/BoardColumn/logic/actions';
import initialState from './logic/initialState';

export interface Props {
	boardId: string;
	children: JSX.Element;
	onClose?: (data: WebApi.Board.CreateBoardColumn) => void;
}

interface Option {
	key: string | number;
	value: any;
	text: string | JSX.Element | JSX.Element[];
}

const Body: React.FC<Props> = ({ boardId, children, onClose = () => {} }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const context = useBoardColumnContext();
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const statusOpts: Option[] = [
		{ key: 0, value: 'backlog', text: t('backlog') },
		{ key: 1, value: 'todo', text: t('todo') },
		{ key: 2, value: 'in progress', text: t('in_progress') },
		{ key: 3, value: 'done', text: t('done') },
	];

	const clearContext = () => {
		Object.keys(context.data).forEach((key) => context.set(key as any, (initialState as any)[key]));
	};

	const curryOpen = (isOpened: boolean) => () => {
		setIsModalOpened(isOpened);

		if (isOpened) {
			clearContext();
		}
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		const allFields = context.data.columnName && context.data.status;

		if (allFields) {
			const data = {
				...context.data,
				board: boardId,
			};

			dispatch(createColumn({ data }));
			onClose(data);
			setIsModalOpened(false);
		}
	};

	return (
		<Modal
			onOpen={curryOpen(true)}
			onClose={curryOpen(false)}
			trigger={children}
			openOnTriggerClick
			closeOnDimmerClick
			closeOnEscape
			closeIcon
			as="form"
			onSubmit={submit}
			size="tiny"
			dimmer="inverted"
			open={isModalOpened}
		>
			<Modal.Header>{t('create_column')}</Modal.Header>
			<Modal.Content scrolling>
				<Form as="div">
					<Form.Field>
						<label className="required">{t('status')}</label>
						<Form.Select
							placeholder={t('status')}
							options={statusOpts}
							fluid
							value={context.data.status ?? ''}
							onChange={(event, data) => context.set('status', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('name')}</label>
						<Form.Input
							placeholder={t('name')}
							fluid
							icon="users"
							value={context.data.columnName ?? ''}
							onChange={(event, data) => context.set('columnName', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('is_resolution_set')}</label>
						<Form.Checkbox
							onChange={(event, data) => context.set('isResolutionSet', data.checked)}
							toggle
							checked={context.data.isResolutionSet ?? false}
							label={t('is_resolution_set')}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button className="primaryBtn" type="submit">
					{t('submit')}
				</Button>
				<Button className="cancelBtn" compact onClick={curryOpen(false)}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default Body;
