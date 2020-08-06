import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import styles from 'containers/TeamPage/styles.module.scss';

type CardProps = {
	mockData: string;
};

const TeamDevsCard = ({ mockData }: CardProps) => {
	return (
		<Card>
			<Card.Content header="Devs" />
			<Card.Meta>
				<span className={styles.meta_header}>
					<Icon name="eye" /> Open team
				</span>
			</Card.Meta>
			<Card.Content description={mockData} />
			<Card.Content extra>
				<Button.Group fluid>
					<Button compact className={styles.margin_1}>
						Add people
					</Button>
					<Button compact icon="ellipsis horizontal" />
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default TeamDevsCard;
