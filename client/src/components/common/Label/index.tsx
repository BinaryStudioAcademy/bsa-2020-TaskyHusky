import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
	text: string;
	textColor: string;
	backgroundColor: string;
}

const Label: React.FC<Props> = ({ text, textColor, backgroundColor }) => {
	return (
		<span className={styles.wrapper}>
			<span className={classNames({ [styles.container]: text })} style={{ backgroundColor }}>
				<span className={styles.label} style={{ color: textColor }}>
					{text}
				</span>
			</span>
		</span>
	);
};

export default Label;
