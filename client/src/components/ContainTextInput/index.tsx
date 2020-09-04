import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, InputOnChangeData } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { setContainTextInput } from 'containers/AdvancedSearch/logic/actions';

const ContainTextInput: React.FC = () => {
	const dispatch = useDispatch();
	const [inputText, setTextInput] = useState('');

	const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		setTextInput(data.value);
	};

	const onSearch = () => {
		dispatch(setContainTextInput({ inputText }));
	};

	return (
		<div className={styles.searchInputContainer}>
			<Input
				value={inputText}
				onChange={handleTextInput}
				placeholder="Contains text"
				className={styles.containTextInput}
			/>
			<Button onClick={onSearch} className={styles.searchBtn} primary content="Search" />
		</div>
	);
};

export default ContainTextInput;
