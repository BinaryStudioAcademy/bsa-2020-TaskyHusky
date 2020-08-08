import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { teamMembers } from 'services/team.service';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';

const TeamsMembersCard = () => {
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content header={t('members')} />
			<Card.Meta>
				<span className={styles.meta_header}>
					{' '}
					{teamMembers().length} {t('members_lower')}
				</span>
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
