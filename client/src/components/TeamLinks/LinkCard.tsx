import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { CurrentLink } from './index';

export type Props = {
	edit: (arg: CurrentLink) => void;
	deleteLink: (arg: CurrentLink) => void;
	isUserConsistsInTeam: boolean;
	link: CurrentLink;
};

const LinkCard = (props: Props) => {
	const { link, edit, deleteLink, isUserConsistsInTeam } = props;
	const [showButtons, setShowButtons] = useState<boolean>(false);
	const showBtns = () => setShowButtons(true);
	const hideBtns = () => setShowButtons(false);

	return (
		<div className={styles.linkCardWrapper} onMouseEnter={showBtns} onMouseLeave={hideBtns}>
			<div className={styles.hederContainer}>
				<h3 className={styles.linkHeader}>{link.name}</h3>
				<a className={styles.linkHref} href={link.http} target="_blank" rel="noopener noreferrer">
					<Icon name="linkify" size="large" />
					{link.http}
				</a>
			</div>
			<p className={styles.linkDescription}>{link.description}</p>
			{showButtons && isUserConsistsInTeam && (
				<div className={styles.btnsBlock}>
					<Icon size="large" className={styles.button} name="pencil" onClick={() => edit(link)} />
					<Icon size="large" className={styles.button} name="trash" onClick={() => deleteLink(link)} />
				</div>
			)}
		</div>
	);
};

export default LinkCard;
