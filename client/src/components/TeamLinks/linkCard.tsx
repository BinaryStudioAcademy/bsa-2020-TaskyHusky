import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';
import { useTranslation } from 'react-i18next';

export type Props = {
	edit: (arg: CurrentLink) => void;
	deleteLink: (arg: CurrentLink) => void;
	link: CurrentLink;
};

const LinkCard = ({ link, edit, deleteLink }: Props) => {
	const [showButtons, setShowButtons] = useState<boolean>(false);
	const showBtns = () => setShowButtons(true);
	const hideBtns = () => setShowButtons(false);

	const { t } = useTranslation();

	return (
		<div className={styles.link_card_wrapper} onMouseEnter={showBtns} onMouseLeave={hideBtns}>
			<h3 className={styles.link_header}>{link.name}</h3>
			<p className={styles.link_description}>{link.description}</p>
			<a className={styles.link_href} href={link.http} target="_blank" rel="noopener noreferrer">
				<Icon name="linkify" size="large" />
				{link.http}
			</a>
			{showButtons && (
				<div className={styles.btns_block}>
					<Button size="large" content={t('edit')} onClick={() => edit(link)} />
					<Button size="large" content={t('delete')} onClick={() => deleteLink(link)} />
				</div>
			)}
		</div>
	);
};

export default LinkCard;
