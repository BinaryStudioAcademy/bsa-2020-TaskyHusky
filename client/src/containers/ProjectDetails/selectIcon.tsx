import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import i18n from 'i18next';
import styles from './styles.module.scss';
import icons from 'assets/images/project';

interface Props {
	currentIcon: any;
	onIconChange: (field: string, icon: string) => void;
}

const SelectIcon = ({ currentIcon, onIconChange }: Props) => {
	const [isIconsModalOpened, setIsIconsModalOpened] = useState<boolean>(false);

	const onChooseIcon = (icon: string): void => {
		onIconChange('icon', icon);
		setIsIconsModalOpened(false);
	};

	return (
		<Modal
			onClose={() => setIsIconsModalOpened(false)}
			onOpen={() => setIsIconsModalOpened(true)}
			open={isIconsModalOpened}
			size="tiny"
			trigger={
				<button type="button" className={styles.form__avatar}>
					<img className={styles.avatar__img} src={currentIcon} alt="Project avatar" />
					<span className={styles.avatar__text}>{i18n.t('select_image')}</span>
				</button>
			}
		>
			<Modal.Header>{'Click to edit this avatar'}</Modal.Header>
			<div className={styles.icons__container}>
				<ul className={styles.icons__list}>
					{Object.values(icons).map((icon: string) => (
						<li className={styles.icons__list_item} key={icon}>
							<button className={styles.icons__icon_btn} onClick={() => onChooseIcon(icon)}>
								<img className={styles.icons__icon} src={icon} alt="Icon" />
							</button>
						</li>
					))}
				</ul>
			</div>
			<Modal.Actions>
				<Button color="grey" onClick={() => setIsIconsModalOpened(false)}>
					{i18n.t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SelectIcon;
