import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import useLabelWidth from './useLabelWidth';

interface Props {
	text: string;
	textColor: string;
	backgroundColor: string;
	isFullSize?: boolean;
}

const Label: React.FC<Props> = ({ text, textColor, backgroundColor, isFullSize }) => {
	const { isBlock, label, labelContainer } = useLabelWidth({ text });

	return (
		<span ref={labelContainer} className={styles.wrapper}>
			<span
				ref={label}
				className={classNames(
					{ [styles.container__label_block]: isBlock },
					{ [styles.full_size__container]: isFullSize },
					{ [styles.container]: text },
				)}
				style={{ backgroundColor }}
			>
				<span
					className={classNames(styles.label, { [styles.full_size]: isFullSize })}
					style={{ color: textColor }}
				>
					{text}
				</span>
			</span>
		</span>
	);
};

export default Label;
