import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

const ResultTeams: React.FC<WebApi.Entities.Team> = ({ color, name, id }) => (
	<Link to={`/team/${id}`} className={style.team}>
		<b>{name}</b>
		<div style={{ background: color, width: 20, height: 20 }} />
	</Link>
);

export default React.memo(ResultTeams);
