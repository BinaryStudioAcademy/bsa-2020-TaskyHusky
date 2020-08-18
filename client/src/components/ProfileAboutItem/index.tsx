import React from 'react';
import styles from './styles.module.scss';

interface Props {
	text: string;
	placeholder: string;
	icon: string;
}
const ProfileAboutItem: React.FC<Props> = (props: Props) => {
	const { text = '', placeholder, icon } = props;
	return (
		<div className={styles.container}>
			<img src={icon} alt="icon" className={styles.icon} />
			{text ? <p className={styles.textData}>{text}</p> : <p className={styles.textData}>{placeholder}</p>}
		</div>
	);
};

export default ProfileAboutItem;
