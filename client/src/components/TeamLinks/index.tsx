import React from 'react';
import { Header, Image, Button } from 'semantic-ui-react';
import linksImg from 'assets/images/team-page-links.jpg';
import styles from 'containers/TeamPage/styles.module.scss';

const TeamLinks = () => {
	return (
		<>
			<div className={styles.link_header}>
				<Header as="h3">Links</Header>
				<Button compact basic className={styles.btn_borderless} icon="plus" />
			</div>
			<div className={[styles.worked_block_wrapper, styles.shadow_top, styles.align_center].join(' ')}>
				<Image src={linksImg} size="large" />
			</div>
		</>
	);
};

export default TeamLinks;
