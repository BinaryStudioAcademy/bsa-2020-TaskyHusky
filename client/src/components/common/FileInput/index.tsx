import React, { createRef } from 'react';

interface Props {
	children: JSX.Element;
	attributes?: Record<string, any>;
	onChange?: (files: FileList | null) => void;
}

const FileInput: React.FC<Props> = ({ children, onChange, attributes = {} }) => {
	const inputRef = createRef<HTMLInputElement>();

	const openFileInput = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<>
			<div onClick={openFileInput}>{children}</div>
			<input
				{...attributes}
				type="file"
				ref={inputRef}
				onChange={(event) => {
					if (onChange) {
						onChange(event.target.files);
					}
				}}
				style={{ display: 'none' }}
			/>
		</>
	);
};

export default FileInput;
