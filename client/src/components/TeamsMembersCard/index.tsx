import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { teamMembers } from 'services/team.service';
import styles from 'containers/TeamPage/styles.module.scss';

const TeamsMembersCard = () => {
	return (
		<Card>
			<Card.Content header="Members" />
			<Card.Meta>
				<span className={styles.meta_header}> {teamMembers().length} members</span>
			</Card.Meta>
			{teamMembers().map((el) => {
				return (
					<Card.Content key={el.id}>
						<div className={styles.card_body}>
							<div className={styles.icon}>
								<Image src={el.avatar} centered circular />
							</div>
							<div className={styles.user_info}>
								<p> {el.name}</p>
								<p className={styles.metainfo}>{el.position}</p>
							</div>
						</div>
					</Card.Content>
				);
			})}
		</Card>
	);
};

export default TeamsMembersCard;
