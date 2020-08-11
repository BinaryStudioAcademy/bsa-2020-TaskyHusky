import React from 'react';
import styles from './styles.module.scss';

interface Props {
	passLength: number;
}

const PasswordCheck: React.FC<Props> = (props: Props) => {
	const { passLength } = props;
	return (
		<div className={passLength ? styles.progress : styles.hidden}>
			<div
				className={`${passLength < 6 ? styles.red : passLength < 9 ? styles.yellow : styles.green} ${
					styles.progress__line
				}`}
			></div>
			<div
				className={`${passLength < 6 ? styles.grey : passLength < 9 ? styles.yellow : styles.green} ${
					styles.progress__line
				}`}
			></div>
			<div className={`${passLength < 9 ? styles.grey : styles.green} ${styles.progress__line}`}></div>
		</div>
	);
};

export default PasswordCheck;
