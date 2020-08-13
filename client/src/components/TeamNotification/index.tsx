import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type NotifProps = {
	toggleNotification: () => void;
};

const TeamNotification = ({ toggleNotification }: NotifProps) => {
	const { t } = useTranslation();

	return (
		<Message icon onDismiss={toggleNotification} color="violet">
			<Icon name="lightbulb outline" size="mini" />
			<Message.Content>
				<Message.Header>Embracing remote teamwork</Message.Header>
				<p>Build stronger remote teams with practices that improve communication alignment and team empathe.</p>
				<p>
					<Link to="#">{t('learn_more')}</Link>
					{'   '}
					<Link to="#">{t('next_tip')}</Link>
				</p>
			</Message.Content>
		</Message>
	);
};

export default TeamNotification;
