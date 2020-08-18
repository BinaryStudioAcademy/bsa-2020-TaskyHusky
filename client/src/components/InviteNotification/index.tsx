import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	id: string;
	name: string;
	avatar: string;
	jobTitle: string;
}

const InviteNotification: React.FC<Props> = (props: Props) => {
	const { avatar, name, id, jobTitle } = props;
	const { t } = useTranslation();

	return (
		<Card>
			<Card.Content>
				<Image floated="right" size="mini" src={avatar} />
				<Card.Header>{name}</Card.Header>
				<Card.Meta>{jobTitle}</Card.Meta>
				<Card.Description>{t('invite_notification_text')}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button basic color="green">
						{t('approve')}
					</Button>
					<Button basic color="red">
						{t('decline')}
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
};

export default InviteNotification;
