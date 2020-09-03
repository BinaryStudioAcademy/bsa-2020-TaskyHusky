import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import * as actions from '../../containers/Header/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';

interface Props {
	id: string;
	name: string;
	avatar: string;
	jobTitle: string;
}

const InviteNotification: React.FC<Props> = (props: Props) => {
	const { avatar, name, id, jobTitle } = props;
	const authStore = useSelector((rootStore: RootState) => rootStore.auth);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleApprove = () => {
		dispatch(
			actions.changeInviteStatus({
				userId: authStore.user?.id || '',
				teammateId: id,
				status: 'accept',
			}),
		);
	};

	const handleDecline = () => {
		dispatch(
			actions.changeInviteStatus({
				userId: authStore.user?.id || '',
				teammateId: id,
				status: 'decline',
			}),
		);
	};

	return (
		<Card>
			<Card.Content>
				<Image floated="right" size="mini" src={avatar} circular />
				<Card.Header>{name}</Card.Header>
				<Card.Meta>{jobTitle}</Card.Meta>
				<Card.Description>{t('invite_notification_text')}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button className="primaryBtn" onClick={handleApprove}>
						{t('approve')}
					</Button>
					<Button className="cancelBtn" onClick={handleDecline}>
						{t('decline')}
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
};

export default InviteNotification;
