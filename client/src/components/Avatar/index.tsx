import React from 'react';
import styles from './styles.module.scss';

interface Props {
	fullName: string;
	imgSrc?: string;
	color?: string;
}

const Avatar = ({ fullName, imgSrc, color }: Props) => {
	const getAvatarInitials = (textString: string) => {
		if (!textString) {
			return '';
		}
		const text = textString.trim();
		const textSplit = text.split(' ');
		if (textSplit.length <= 1) {
			return text.charAt(0);
		}
		const initials = textSplit[0].charAt(0).toUpperCase() + textSplit[textSplit.length - 1].charAt(0).toUpperCase();
		return initials;
	};

	const renderImage = () => {
		return (
			<div>
				<img alt="avatar" className={styles.avatar} src={imgSrc} />
			</div>
		);
	};

	const renderPlaceholder = () => {
		return (
			<div className={styles.placeholderContainer} style={{ backgroundColor: color ?? '#676f74' }}>
				<span className={styles.placeholder}>{getAvatarInitials(fullName)}</span>
			</div>
		);
	};

	return <div className={styles.avatarContainer}>{imgSrc ? renderImage() : renderPlaceholder()}</div>;
};

export default Avatar;
