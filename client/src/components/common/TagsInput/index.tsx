import React, { useState } from 'react';
import { Input, Segment, Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	onChange: (tags: string[]) => void;
	placeholder?: string;
	tags: string[];
}

const TagsInput: React.FC<Props> = ({ onChange, placeholder, tags }) => {
	const [value, setValue] = useState<string>('');

	const addTag = (text: string) => {
		const newTags = [...tags, text];
		setValue('');
		onChange(newTags);
	};

	const removeTag = (index: number) => {
		const newTags = [...tags];
		newTags.splice(index, 1);
		onChange(newTags);
	};

	return (
		<Segment>
			<div style={{ marginBottom: 5 }}>
				Press &#39;Arrow Up <Icon name="arrow up" />
				&#39; to apply tag.
			</div>
			<div className={styles.tagContainer}>
				{tags.map((tag, i) => (
					<Label key={i} color="teal" tag>
						{tag}
						<Icon name="close" link onClick={() => removeTag(i)} />
					</Label>
				))}
			</div>
			<Input
				placeholder={placeholder}
				fluid
				value={value}
				onChange={(event, data) => setValue(data.value)}
				transparent
				onKeyDown={(event: React.KeyboardEvent & { target: { value: string } }) => {
					if (event.key === 'ArrowUp' && value !== '') {
						event.preventDefault();
						addTag(event.target.value);
					}
				}}
			/>
		</Segment>
	);
};

export default TagsInput;
