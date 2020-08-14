import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addComment } from './logic/actions';

interface Props {
	onSubmit?: (text: string) => void;
	issueId: string;
}

const IssueCommentForm: React.FC<Props> = ({ onSubmit, issueId }) => {
	const [text, setText] = useState<string>('');
	const dispatch = useDispatch();

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

		if (onSubmit) {
			onSubmit(text);
		}
	};

	return (
		<Form onSubmit={submit}>
			<Form.Field>
				<label className="required">Text</label>
				<Form.TextArea
					placeholder="Enter your comment text..."
					onChange={(event, data) => setText(data.value ? (data.value as string) : '')}
					value={text}
				/>
			</Form.Field>
			<Button>Post comment</Button>
		</Form>
	);
};

export default IssueCommentForm;
