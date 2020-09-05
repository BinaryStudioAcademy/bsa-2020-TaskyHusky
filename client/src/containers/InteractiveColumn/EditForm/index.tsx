import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useBoardColumnContext } from 'containers/CreateColumnModal/logic/context';

interface Props {
	columnId: string;
}

interface Option {
	key: string | number;
	value: any;
	text: string | JSX.Element | JSX.Element[];
}

const EditForm: React.FC<Props> = ({ columnId }) => {
	const { t } = useTranslation();
	const context = useBoardColumnContext();

	const statusOpts: Option[] = [
		{ key: 0, value: 'backlog', text: t('backlog') },
		{ key: 1, value: 'todo', text: t('todo') },
		{ key: 2, value: 'in progress', text: t('in_progress') },
		{ key: 3, value: 'done', text: t('done') },
	];

	return (
		<Form style={{ marginTop: 30 }}>
			<Form.Field>
				<label className="required">{t('status')}</label>
				<Form.Select options={statusOpts} placeholder={t('status')} value={context.data.status} />
			</Form.Field>
			<Form.Field>
				<label className="required">{t('name')}</label>
				<Form.Input placeholder={t('name')} value={context.data.columnName} />
			</Form.Field>
			<Form.Field>
				<label className="required">{t('is_resolution_set')}</label>
				<Form.Checkbox toggle label={t('is_resolution_set')} checked={context.data.isResolutionSet} />
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
