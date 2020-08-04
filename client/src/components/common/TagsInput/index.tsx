import React, { useState } from 'react';
import { Input, Segment } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	onChange: (tags: string[]) => void;
	placeholder?: string;
}

const TagsInput: React.FC<Props> = ({ onChange, placeholder }) => {
	const [tags, setTags] = useState<string[]>([]);
	const [value, setValue] = useState<string>('');

	const addTag = (text: string) => {
		const newTags = [...tags, text];
		setValue('');
		setTags(newTags);
		onChange(newTags);
	};

	return (
		<Segment>
			<div className={styles.tagContainer}>
				{tags.map((tag, i) => (
					<div key={i} className={styles.tag}>
						{tag}
					</div>
				))}
			</div>
			<Input
				placeholder={placeholder}
				fluid
				value={value}
				onChange={(event, data) => setValue(data.value)}
				transparent
				onKeyPress={(event: React.KeyboardEvent & { target: { value: string } }) => {
					if (event.key === 'Enter') {
						addTag(event.target.value);
					}
				}}
			/>
		</Segment>
	);
};

export default TagsInput;
