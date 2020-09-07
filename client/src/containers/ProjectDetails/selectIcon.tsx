import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import i18n from 'i18next';
import styles from './styles.module.scss';
import icons from 'assets/images/project';

interface Props {
	onIconChange: (field: string, icon: string) => void;
	uploadPhoto: (e: any) => void;
	onClose: () => void;
	isIconsModalOpened: boolean;
}

const SelectIcon = ({ onIconChange, uploadPhoto, isIconsModalOpened, onClose }: Props) => {
	const onChooseIcon = (icon: string): void => {
		onIconChange('icon', icon);
		onClose();
	};

	return (
		<Modal onClose={onClose} open={isIconsModalOpened} size="tiny">
			<Modal.Header>
				<p className="standartHeader">{'Click to edit this avatar'}</p>{' '}
				<Button className="primaryBtn">{i18n.t('upload_new')}</Button>
				<input
					accept=".jpg, .jpeg, .png, .bmp"
					id="contained-button-file"
					type="file"
					onInput={uploadPhoto}
					className={styles.hidden}
				/>
			</Modal.Header>
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
				<Button className="cancelBtn" onClick={onClose}>
					{i18n.t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SelectIcon;
