import React, { useState, useEffect } from 'react';
import { Card, Grid, Message, Icon, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { teamMembers } from 'services/team.service';
import worksImg from 'assets/images/team-page-works.jpg';
import linksImg from 'assets/images/team-page-links.jpg';

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
					<Card>
						<Card.Content header="Devs" />
						<Card.Meta>
							<span className={styles.meta_header}>
								<Icon name="eye" /> Open team
							</span>
						</Card.Meta>
						<Card.Content description={mockData} />
						<Card.Content extra>
							<Button.Group fluid>
								<Button compact className={styles.margin_1}>
									Add people
								</Button>
								<Button compact icon="ellipsis horizontal" />
							</Button.Group>
						</Card.Content>
					</Card>

					<Card>
						<Card.Content header="Members" />
						<Card.Meta>
							<span className={styles.meta_header}> {teamMembers().length} members</span>
						</Card.Meta>
						{teamMembers().map((el) => {
							return (
								<Card.Content key={el.id}>
									<div className={styles.card_body}>
										<div className={styles.icon}>
											<Image src={el.avatar} centered circular />
										</div>
										<div className={styles.user_info}>
											<p> {el.name}</p>
											<p className={styles.metainfo}>{el.position}</p>
										</div>
									</div>
								</Card.Content>
							);
						})}
					</Card>
				</Grid.Column>
				<Grid.Column width="8">
					{notification && (
						<Message icon onDismiss={toggleNotification} color="violet">
							<Icon name="lightbulb outline" size="mini" />
							<Message.Content>
								<Message.Header>Embracing remote teamwork</Message.Header>
								<p>
									Build stronger remote teams with practices that improve communication alignment and
									team empathe.
								</p>
								<p>
									<Link to="#">Learn more</Link>
									{' . '}
									<Link to="#">Next tip</Link>
								</p>
							</Message.Content>
						</Message>
					)}
					<Header as="h3">Worked on</Header>
					<div className={styles.worked_block_wrapper}>
						<Image src={worksImg} size="small" />
						<div className={styles.worked_block}>
							<Header as="h4">There is no works to see here</Header>
							<p>{mockData}</p>
						</div>
					</div>
					<div className={styles.link_header}>
						<Header as="h3">Links</Header>
						<Button compact basic className={styles.btn_borderless} icon="plus" />
					</div>
					<div className={[styles.worked_block_wrapper, styles.shadow_top, styles.align_center].join(' ')}>
						<Image src={linksImg} size="large" />
					</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
