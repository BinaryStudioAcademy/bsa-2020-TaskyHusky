import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';

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
					<Button
						size="mini"
						icon="edit"
						className={`${styles.editBtn} ${styles.paddingBtn}`}
						onClick={() => edit(link)}
					/>
					<Button
						size="mini"
						icon="trash alternate outline"
						className={`${styles.deleteBtn} ${styles.paddingBtn}`}
						onClick={() => deleteLink(link)}
					/>
				</div>
			)}
		</div>
	);
};

export default LinkCard;
