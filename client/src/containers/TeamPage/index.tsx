import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles.module.scss';
import TeamDevsCard from 'components/TeamDevsCard';
import TeamsMembersCard from 'components/TeamsMembersCard';
import TeamNotification from 'components/TeamNotification';
import TeamWorkedProjects from 'components/TeamWorkedProjects';
import TeamLinks from 'components/TeamLinks';
import * as actions from './logic/actions';
import TeamAddPeopleModal from 'components/TeamAddPeopleModal';
import CreateLink from 'components/TeamLinks/createLink';

const TeamPage = ({ match: { params }, team: { team } }: { match: any; team: any }) => {
	const [notification, setNotification] = useState<boolean>(true);
	const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);
	const [deleteTeamModal, setShowDeleteTeamModal] = useState<boolean>(false);
	const [addLinks, setAddLinks] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.startLoading({ id: params.id }));
	}, []);

	const toggleNotification = (): void => setNotification(false);
	const showAddPeopleModal = (): void => setAddPeopleModal(true);
	const toggleAddLinks = (): void => setAddLinks(!addLinks);

	return (
		team && (
			<Grid columns="equal" centered>
				{console.log(team)}
				<Grid.Row>
					<div className={[styles.header, styles.team_header].join(' ')}></div>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width="4">
						<TeamDevsCard
							description={team.description}
							name={team.name}
							showAddPeopleModal={showAddPeopleModal}
							setShowDeleteTeamModal={setShowDeleteTeamModal}
						/>
						<TeamsMembersCard />
					</Grid.Column>
					<Grid.Column width="8">
						{notification && <TeamNotification toggleNotification={toggleNotification} />}
						<TeamWorkedProjects />
						<TeamLinks currentLinks={team.links} addLinks={toggleAddLinks} />
					</Grid.Column>
				</Grid.Row>
				{addPeopleModal && <TeamAddPeopleModal onClose={setAddPeopleModal} />}
				{addLinks && <CreateLink onClose={toggleAddLinks} />}
			</Grid>
		)
	);
};
const mapStateToProps = (state: any) => ({
	team: state.team,
});

export default connect(mapStateToProps)(TeamPage);
