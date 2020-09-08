import React from 'react';
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
	return (
		<div className={styles.linkCardWrapper}>
			<h3 className={styles.linkHeader}>{link.name}</h3>
			<a className={styles.linkHref} href={link.http} target="_blank" rel="noopener noreferrer">
				{link.http}
			</a>
			<div>
				<p className={styles.linkDescription}>{link.description}</p>
				{isUserConsistsInTeam && (
					<div className={styles.btnsBlock}>
						<Icon size="large" className={styles.button} name="pencil" onClick={() => edit(link)} />
						<Icon size="large" className={styles.button} name="trash" onClick={() => deleteLink(link)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default LinkCard;
