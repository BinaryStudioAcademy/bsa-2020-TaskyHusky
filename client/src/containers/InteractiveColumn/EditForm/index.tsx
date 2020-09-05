import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useBoardColumnContext } from 'containers/CreateColumnModal/logic/context';
import { useDispatch } from 'react-redux';
import { updateColumn } from 'containers/BoardColumn/logic/actions';

interface Props {
	columnId: string;
	onSubmit?: (data: Partial<WebApi.Board.CreateBoardColumn>) => void;
}

interface Option {
	key: string | number;
	value: any;
	text: string | JSX.Element | JSX.Element[];
}

const EditForm: React.FC<Props> = ({ columnId, onSubmit }) => {
	const { t } = useTranslation();
	const context = useBoardColumnContext();
	const dispatch = useDispatch();

	const statusOpts: Option[] = [
		{ key: 0, value: 'backlog', text: t('backlog') },
		{ key: 1, value: 'todo', text: t('todo') },
		{ key: 2, value: 'in progress', text: t('in_progress') },
		{ key: 3, value: 'done', text: t('done') },
	];

	const submit = () => {
		const allFields = context.data.status && context.data.columnName;
		if (!allFields) {
			return;
		}

		dispatch(updateColumn({ id: columnId, data: context.data }));

		if (onSubmit) {
			onSubmit(context.data);
		}
	};

	return (
		<Form style={{ marginTop: 30 }} onSubmit={submit}>
			<Form.Field>
				<label className="required">{t('status')}</label>
				<Form.Select
					options={statusOpts}
					placeholder={t('status')}
					value={context.data.status}
					closeOnChange
					onChange={(event, data) => context.set('status', data.value)}
				/>
			</Form.Field>
			<Form.Field>
				<label className="required">{t('name')}</label>
				<Form.Input
					placeholder={t('name')}
					value={context.data.columnName}
					onChange={(event, data) => context.set('columnName', data.value)}
				/>
			</Form.Field>
			<Form.Field>
				<label className="required">{t('is_resolution_set')}</label>
				<Form.Checkbox
					toggle
					label={t('is_resolution_set')}
					checked={context.data.isResolutionSet}
					onChange={(event, data) => context.set('isResolutionSet', data.checked)}
				/>
			</Form.Field>
			<Button className="primaryBtn" compact disabled={false}>
				{t('submit')}
			</Button>
			<Button className="cancelBtn" compact disabled={false}>
				{t('cancel')}
			</Button>
		</Form>
	);
};

export default EditForm;
