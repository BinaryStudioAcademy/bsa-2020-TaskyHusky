import React from 'react';
import styles from './styles.module.scss';

interface Props {
	passLength: number;
	acceptLength: number;
}

const PasswordCheck: React.FC<Props> = (props: Props) => {
	const { passLength, acceptLength } = props;
	const superLength = 12;
	const firstIndicator = () =>
		passLength < acceptLength ? styles.red : passLength < superLength ? styles.yellow : styles.green;
	const secondIndicator = () =>
		passLength < acceptLength ? styles.grey : passLength < superLength ? styles.yellow : styles.green;
	const thirdIndicator = () => (passLength < superLength ? styles.grey : styles.green);
	return (
		<div className={passLength ? styles.progress : styles.hidden}>
			<div className={`${firstIndicator()} ${styles.line}`}></div>
			<div className={`${secondIndicator()} ${styles.line}`}></div>
			<div className={`${thirdIndicator()} ${styles.line}`}></div>
		</div>
	);
};

export default PasswordCheck;
