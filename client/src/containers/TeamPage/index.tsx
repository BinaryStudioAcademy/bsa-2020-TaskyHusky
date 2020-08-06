import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './styles.module.scss';
import TeamDevsCard from 'components/TeamDevsCard';
import TeamsMembersCard from 'components/TeamsMembersCard';
import TeamNotification from 'components/TeamNotification';
import TeamWorkedProjects from 'components/TeamWorkedProjects';
import TeamLinks from 'components/TeamLinks';

export const TeamPage: React.FC = () => {
	const [notification, setNotification] = useState<boolean>(true);
	useEffect(() => {
		console.log('dispatch');
	}, []);
	const toggleNotification = (): void => setNotification(false);
	const mockData: string =
		'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint vel quas quae itaque neque distinctio amet qui nulla debitis laudantium';
	return (
		<Grid columns="equal" centered>
			<Grid.Row>
				<div className={[styles.header, styles.team_header].join(' ')}></div>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width="4">
					<TeamDevsCard mockData={mockData} />
					<TeamsMembersCard />
				</Grid.Column>
				<Grid.Column width="8">
					{notification && <TeamNotification toggleNotification={toggleNotification} />}
					<TeamWorkedProjects />
					<TeamLinks />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
