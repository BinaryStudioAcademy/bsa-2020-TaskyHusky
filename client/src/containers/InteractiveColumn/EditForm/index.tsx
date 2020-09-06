import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateColumn } from 'containers/BoardColumn/logic/actions';

interface Props {
	column: WebApi.Result.BoardColumnResult;
	onSubmit?: (data: Partial<WebApi.Board.CreateBoardColumn>) => void;
}

interface Option {
	key: string | number;
	value: any;
	text: string | JSX.Element | JSX.Element[];
}

const EditForm: React.FC<Props> = ({ column, onSubmit }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [status, setStatus] = useState<string>(column.status);
	const [name, setName] = useState<string>(column.columnName);
	const [isResolutionSet, setIsResolutionSet] = useState<boolean>(column.isResolutionSet);

	const statusOpts: Option[] = [
		{ key: 0, value: 'backlog', text: t('backlog') },
		{ key: 1, value: 'todo', text: t('todo') },
		{ key: 2, value: 'in progress', text: t('in_progress') },
		{ key: 3, value: 'done', text: t('done') },
	];

	const submit = () => {
		const allFields = name && status;

		if (!allFields) {
			return;
		}

		const data = {
			columnName: name,
			status,
			isResolutionSet,
		};

		dispatch(updateColumn({ id: column.id, data }));

		if (onSubmit) {
			onSubmit(data);
		}
	};

	return (
		<Form style={{ marginTop: 30 }} onSubmit={submit}>
			<Form.Field>
				<label className="required">{t('status')}</label>
				<Form.Select
					options={statusOpts}
					placeholder={t('status')}
					value={status}
					closeOnChange
					onChange={(event, data) => setStatus(data.value as string)}
				/>
			</Form.Field>
			<Form.Field>
				<label className="required">{t('name')}</label>
				<Form.Input placeholder={t('name')} value={name} onChange={(event, data) => setName(data.value)} />
			</Form.Field>
			<Form.Field>
				<label className="required">{t('is_resolution_set')}</label>
				<Form.Checkbox
					toggle
					label={t('is_resolution_set')}
					checked={isResolutionSet}
					onChange={(event, data) => setIsResolutionSet(data.checked ?? false)}
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
