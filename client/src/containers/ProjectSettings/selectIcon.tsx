import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import i18n from 'i18next';

import styles from './styles.module.scss';

import i1 from 'assets/images/projectAvatars/1.svg';

interface Props {
	currentIcon: any;
	setCurrentIcon: (iconName: any) => void;
}

const SelectIcon = ({ currentIcon, setCurrentIcon }: Props) => {
	const [isIconsModalOpened, setIsIconsModalOpened] = useState(false);

	return (
		<Modal
			closeIcon
			onClose={() => setIsIconsModalOpened(false)}
			onOpen={() => setIsIconsModalOpened(true)}
			open={isIconsModalOpened}
			dimmer="inverted"
			size="tiny"
			trigger={
				<button type="button" className={styles.form__avatar}>
					<img className={styles.avatar__img} src={i1} alt="Project avatar" />
					<span className={styles.avatar__text}>{i18n.t('select_image')}</span>
				</button>
			}
		>
			<Modal.Header>{'Click to edit this avatar'}</Modal.Header>
			<div className={styles.icons__container}>
				<ul className={styles.icons__list}>
					<li className={styles.icons__list_item}>
						<button className={styles.icons__icon_btn} onClick={() => setCurrentIcon(i1)}>
							<img className={styles.icons__icon} src={i1} alt="Icon" />
						</button>
					</li>
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
