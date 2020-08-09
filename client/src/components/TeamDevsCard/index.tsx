import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';
import { useTranslation } from 'react-i18next';

type CardProps = {
	mockData: string;
};

const TeamDevsCard = ({ mockData }: CardProps) => {
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content header={t('devs')} />
			<Card.Meta>
				<span className={styles.meta_header}>
					<Icon name="eye" /> {t('open_team')}
				</span>
			</Card.Meta>
			<Card.Content description={mockData} />
			<Card.Content extra>
				<Button.Group fluid>
					<Button compact className={styles.margin_1}>
						{t('add_people')}
					</Button>
					<Button compact icon="ellipsis horizontal" />
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default TeamDevsCard;
