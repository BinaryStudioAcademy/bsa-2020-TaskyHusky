import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
	text: string;
	textColor: string;
	backgroundColor: string;
	isFullSize?: boolean;
}

const Label: React.FC<Props> = ({ text, textColor, backgroundColor, isFullSize }) => (
	<span
		className={classNames({ [styles.label]: text }, { [styles.full_size]: isFullSize })}
		style={{ backgroundColor, color: textColor }}
	>
		{text}
	</span>
);

export default Label;
