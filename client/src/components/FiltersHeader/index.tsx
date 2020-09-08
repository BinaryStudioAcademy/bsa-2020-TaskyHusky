import React from 'react';
import styles from './styles.module.scss';

interface Props {
	title: string;
}

const FiltersHeader = (props: Props) => {
	const { title } = props;
	return (
		<div className={styles.header}>
			<h1 className={styles.content}>{title}</h1>
		</div>
	);
};

export default FiltersHeader;
