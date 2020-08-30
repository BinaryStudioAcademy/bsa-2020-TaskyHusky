import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';
import { useTranslation } from 'react-i18next';

export type Props = {
	edit: (arg: CurrentLink) => void;
	deleteLink: (arg: CurrentLink) => void;
	isUserConsistsInTeam: boolean;
	link: CurrentLink;
};

const LinkCard = ({ link, edit, deleteLink, isUserConsistsInTeam }: Props) => {
	const [showButtons, setShowButtons] = useState<boolean>(false);
	const showBtns = () => setShowButtons(true);
	const hideBtns = () => setShowButtons(false);

	const { t } = useTranslation();

	return (
		<div className={styles.linkCardWrapper} onMouseEnter={showBtns} onMouseLeave={hideBtns}>
			<h3 className={styles.linkHeader}>{link.name}</h3>
			<p className={styles.linkDescription}>{link.description}</p>
			<a className={styles.linkHref} href={link.http} target="_blank" rel="noopener noreferrer">
				<Icon name="linkify" size="large" />
				{link.http}
			</a>
			{showButtons && isUserConsistsInTeam && (
				<div className={styles.btnsBlock}>
					<Button size="medium" basic className={styles.editBtn} onClick={() => edit(link)}>
						<span className={styles.editBtnValue}> {t('edit')}</span>
					</Button>
					<Button size="medium" basic className={styles.deleteBtn} onClick={() => deleteLink(link)}>
						<span className={styles.deleteBtnValue}>{t('delete')}</span>
					</Button>
				</div>
			)}
		</div>
	);
};

export default LinkCard;
