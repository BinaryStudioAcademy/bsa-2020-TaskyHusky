import React from 'react';

import img404 from 'assets/images/404.png';
import styles from './styles.module.scss';

interface Props {}

const NotFound = (props: Props) => {
	return (
		<div className={styles.container}>
			<img className={styles.image} src={img404} alt="Page not found" />
		</div>
	);
};

export default NotFound;
