import React from 'react';
import { Header, Image, Button } from 'semantic-ui-react';
import linksImg from 'assets/images/team-page-links.svg';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';
import LinkCard from './linkCard';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

export type CurrentLink = {
	http: string;
	name: string;
	description: string;
};

type Props = {
	addLinks: () => void;
	currentLinks: string[];
	edit: (arg: CurrentLink) => void;
	deleteLink: (arg: CurrentLink) => void;
};

const TeamLinks = ({ addLinks, currentLinks, edit, deleteLink }: Props) => {
	const { t } = useTranslation();
	const authUser = useSelector((rootState: RootState) => rootState.auth.user);
	const teamOwner = useSelector((rootState: RootState) => rootState.team.team.createdBy);

	return (
		<>
			<div className={styles.link_header}>
				<Header as="h3">{t('links')}</Header>
				{teamOwner && teamOwner.id === authUser?.id && (
					<Button compact basic className={styles.btn_borderless} icon="plus" onClick={addLinks} />
				)}
			</div>
			<div className={[styles.worked_block_wrapper, styles.shadow_top, styles.align_center].join(' ')}>
				{currentLinks.length ? (
					currentLinks.map((el: any) => {
						return (
							<LinkCard
								key={el.id}
								link={el}
								edit={edit}
								deleteLink={deleteLink}
								authUser={authUser}
								teamOwner={teamOwner}
							/>
						);
					})
				) : (
					<Image src={linksImg} size="large" />
				)}
			</div>
		</>
	);
};

export default TeamLinks;
