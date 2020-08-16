import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Props {
	isCurrentUser: boolean;
	mockData: any;
}

const ProfileTeamBlock: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { isCurrentUser, mockData } = props;
	return (
		<div>
			<Header as="h3" className={styles.header}>
				{t('team')}
			</Header>
			{mockData.teams.map((item: any) => (
				<div key={item.id} className={styles.item}>
					<div className={styles.groupIcon}>
						<Icon disabled name="group" size="small" />
					</div>
					<div>
						<p className={styles.content}>{item.name}</p>
						<p className={styles.content__secondary}>
							{item.members}
							{item.members === 1 ? ' member' : ' members'}
						</p>
					</div>
				</div>
			))}
			{isCurrentUser && (
				<div className={styles.item}>
					<div className={styles.groupIcon__secondary}>
						<Icon disabled name="group" size="small" />
					</div>
					<p className={styles.content}>{t('start_team')}</p>
				</div>
			)}
		</div>
	);
};

export default ProfileTeamBlock;
