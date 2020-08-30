import React, { ReactElement } from 'react';
import { Card } from 'semantic-ui-react';
import UserAvatar from 'components/common/UserAvatar';

import style from './style.module.scss';

interface Props {
	team: WebApi.Entities.Team;
	handlerClick?: () => void;
}

const TeamListItem: React.FC<Props> = ({ team, handlerClick }): ReactElement => {
	const { color, name, createdBy } = team;

	return (
		<Card onClick={() => handlerClick && handlerClick()} className={style.card}>
			<div className={style.colorBlock} style={{ background: color }} />
			<Card.Content className={style.teamBlock}>
				<Card.Header className={style.teamTitle}>{name}</Card.Header>
				<div className={style.avatarWrapper}>
					<UserAvatar user={createdBy} />
				</div>
			</Card.Content>
		</Card>
	);
};

export default React.memo(TeamListItem);
