import React from 'react';
import style from './style.module.scss';

const ResultTeams: React.FC<WebApi.Entities.Team> = ({ color, name }) => (
	<div className={style.team}>
		<b>{name}</b>
		<div style={{ background: color, width: 20, height: 20 }} />
	</div>
);

export default React.memo(ResultTeams);
