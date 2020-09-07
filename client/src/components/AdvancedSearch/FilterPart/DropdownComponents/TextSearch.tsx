import React, { useState, createRef, useEffect } from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';
import styles from './textSearch.module.scss';
import { useDispatch } from 'react-redux';
import { FilterPartState } from 'containers/AdvancedSearch/logic/state';
import { updateFilterPart } from 'containers/AdvancedSearch/logic/actions';

interface DropdownTextSearchProps {
	filterPart: FilterPartState;
}

const DropdownTextSearch = ({ filterPart }: DropdownTextSearchProps) => {
	const dispatch = useDispatch();
	const { filterDef, searchText: text } = filterPart;

	const inputRef = createRef() as any;

	const handleClick = () => inputRef.current.focus();

	const { title } = filterDef;
	const searchPrefix = `${title}: `;

	const formSearchPlaceholder = (): string => {
		return !!searchText ? `${searchPrefix}"${searchText}"` : `${searchPrefix}All`;
	};

	const [searchText, setSearchText] = useState(text);
	const [searchPlaceholder, setSearchPlaceholder] = useState(formSearchPlaceholder());

	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);
	useEffect(() => {
		if (focused) {
			handleClick();
		}
	});
	const onUpdate = () => {
		filterPart.searchText = searchText;
		dispatch(updateFilterPart({ filterPart }));
	};

	const formPlaceholder = (text: string): string => {
		return !!text ? `${searchPrefix}"${text}"` : `${searchPrefix}All`;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;

		setSearchText(value);
		setSearchPlaceholder(formPlaceholder(value));
	};

	const handleBlur = () => {
		onUpdate();
		setFocused(false);
	};

	const getStyleName = () => {
		return hovered && !focused ? styles.container_hovered : focused ? styles.container_focused : styles.container;
	};

	return (
		<div
			className={getStyleName()}
			onClick={() => {
				setFocused(true);
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{focused ? (
				<Input
					ref={inputRef}
					className={styles.seachInput_focused}
					onKeyPress={(e: any) => {
						if (e.key === 'Enter') {
							handleBlur();
						}
					}}
					onBlur={handleBlur}
					value={searchText}
					onChange={handleChange}
					placeholder={'Search by Comment'}
					icon={null}
				/>
			) : (
				<span className={styles.textPlaceholder}>{searchPlaceholder}</span>
			)}
		</div>
	);
};

export default DropdownTextSearch;
