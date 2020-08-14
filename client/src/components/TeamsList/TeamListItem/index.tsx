import React, { ReactElement } from 'react';
import { Card, Image } from 'semantic-ui-react';
import style from './style.module.scss';

interface TeamListItem {
	team: WebApi.Entities.Team;
	handlerClick?: () => void;
}

const TeamListItem: React.FC<TeamListItem> = ({ team, handlerClick }): ReactElement => {
	const {
		color,
		name,
		createdBy: { avatar },
	} = team;

	return (
		<Card onClick={() => handlerClick && handlerClick()} className={style.card}>
			<div className={style.colorBlock} style={{ background: color }} />
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Image src={avatar} size={'tiny'} circular />
			</Card.Content>
		</Card>
	);
};

export default React.memo(TeamListItem);
