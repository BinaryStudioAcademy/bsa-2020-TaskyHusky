import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import * as actions from '../../containers/Header/logic/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import styles from './styles.module.scss';

interface Props {
	id: string;
	name: string;
	avatar: string;
	jobTitle: string;
	color?: string;
}

const InviteNotification: React.FC<Props> = (props: Props) => {
	const { avatar, name, id, jobTitle, color } = props;
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

	const [firstName, lastName] = name.split(' ');
	const firstLetter = firstName ? firstName[0] : '';
	const lastLetter = lastName ? lastName[0] : '';
	const initials = firstLetter + lastLetter;

	return (
		<div className={styles.notification}>
			<div style={{ display: 'flex', alignItems: 'center', width: '100%', background: color ?? '#fece2f' }}>
				{avatar ? (
					<img src={avatar} className={styles.avatar} style={{ float: 'left' }} alt="Avatar" />
				) : (
					<div className={styles.avatar}>{initials}</div>
				)}
				<div style={{ width: 'calc(100% - 50px)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ color: '#202020', fontSize: '16px' }}>{name}</div>
						<div>
							<Icon
								name="check"
								onClick={handleApprove}
								style={{ color: '#deae0f' }}
								title={t('approve')}
								link
							/>
							<Icon name="close" onClick={handleDecline} title={t('decline')} link />
						</div>
					</div>
					<div className={styles.meta}>{jobTitle}</div>
				</div>
			</div>
			<div style={{ marginTop: 10 }}>{t('invite_notification_text')}</div>
		</div>
	);
};

export default InviteNotification;
