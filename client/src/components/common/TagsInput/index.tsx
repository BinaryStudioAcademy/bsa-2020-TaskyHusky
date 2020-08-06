import React, { useState } from 'react';
import { Input, Segment, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	onChange: (tags: string[]) => void;
	placeholder?: string;
	tags: string[];
}

const TagsInput: React.FC<Props> = (props: Props) => {
	const { onChange, placeholder, tags } = props;
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
			<div className={styles.tagContainer}>
				{tags.map((tag, i) => (
					<div key={i} className={styles.tag}>
						{tag}
						<Icon name="close" link onClick={() => removeTag(i)} />
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
					if (event.key === 'Enter' && value !== '') {
						addTag(event.target.value);
					}
				}}
			/>
		</Segment>
	);
};

export default TagsInput;
