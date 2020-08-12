import React from 'react';
import { Header, Image, Button } from 'semantic-ui-react';
import linksImg from 'assets/images/team-page-links.svg';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';
import LinkCard from './linkCard';

type Props = {
	addLinks: any;
	currentLinks: string[];
	edit: any;
	deleteLink: any;
};

const TeamLinks = ({ addLinks, currentLinks, edit, deleteLink }: Props) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.link_header}>
				<Header as="h3">{t('Links')}</Header>
				<Button compact basic className={styles.btn_borderless} icon="plus" onClick={addLinks} />
			</div>
			<div className={[styles.worked_block_wrapper, styles.shadow_top, styles.align_center].join(' ')}>
				{currentLinks.length ? (
					currentLinks.map((el: any) => {
						//const obj = JSON.parse(el);
						return <LinkCard key={el.id} link={el} edit={edit} deleteLink={deleteLink} />;
					})
				) : (
					<Image src={linksImg} size="large" />
				)}
			</div>
		</>
	);
};

export default TeamLinks;
