import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addComment } from './logic/actions';
import { useTranslation } from 'react-i18next';

interface Props {
	onSubmit?: (text: string) => void;
	issueId: string;
}

const IssueCommentForm: React.FC<Props> = ({ onSubmit, issueId }) => {
	const [text, setText] = useState<string>('');
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const submit = () => {
		if (!text) {
			return;
		}

		dispatch(
			addComment({
				issueId,
				text,
			}),
		);

		setText('');

		if (onSubmit) {
			onSubmit(text);
		}
	};

	return (
		<Form onSubmit={submit}>
			<Form.Field>
				<label className="required">{t('text')}</label>
				<Form.TextArea
					placeholder={t('enter_comment_text')}
					onChange={(event, data) => setText(data.value ? (data.value as string) : '')}
					value={text}
				/>
			</Form.Field>
			<Button fluid style={{ marginBottom: 10 }}>
				{t('post_comment')}
			</Button>
		</Form>
	);
};

export default IssueCommentForm;
