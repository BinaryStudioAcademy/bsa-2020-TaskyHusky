import React, { useState } from 'react';
import { Input, Segment, Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
	onChange: (tags: string[]) => void;
	placeholder?: string;
	tags: string[];
}

const TagsInput: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
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
		<Segment style={{ marginTop: 10 }}>
			<div style={{ marginBottom: 5 }}>
				{t('tags_input_hint_1')} <Icon name="arrow up" />
				{t('tags_input_hint_2')}
			</div>
			<div className={styles.tagContainer}>
				{tags.map((tag, i) => (
					<Label key={i}>
						<a target="_blank" href={tag} rel="noopener noreferrer">
							{tag}
						</a>
						<Icon name="delete" link onClick={() => removeTag(i)} />
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
