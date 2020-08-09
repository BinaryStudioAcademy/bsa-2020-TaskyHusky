import React from 'react';
import style from './style.module.scss';
import { Team } from '../../../fakeServer/mockData/teams';

const ResultTeams: React.FC<Team> = ({ color, name, id }) => (
	<div className={style.team}>
		<b>{name}</b>
		<div style={{ background: color, width: 20, height: 20 }} />
	</div>
);

export default React.memo(ResultTeams);
