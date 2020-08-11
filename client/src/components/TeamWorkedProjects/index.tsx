import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import worksImg from 'assets/images/team-page-works.jpg';
import styles from 'containers/TeamPage/styles.module.scss';

const TeamWorkedProjects = () => {
	return (
		<>
			<Header as="h3">Worked on</Header>
			<div className={[styles.worked_block_wrapper, styles.flex_row].join(' ')}>
				<Image src={worksImg} size="small" />
				<div className={styles.worked_block}>
					<Header as="h4">There is no works to see here</Header>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui unde autem nam iste incidunt
						ratione impedit ipsa enim deleniti aliquam explicabo nostrum, necessitatibus, assumenda
						architecto esse temporibus, quae quisquam eligendi.
					</p>
				</div>
			</div>
		</>
	);
};

export default TeamWorkedProjects;
