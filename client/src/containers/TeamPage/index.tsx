import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, connect } from 'react-redux';
import styles from './styles.module.scss';
import TeamDevsCard from 'components/TeamDevsCard';
import TeamsMembersCard from 'components/TeamsMembersCard';
import TeamNotification from 'components/TeamNotification';
import TeamWorkedProjects from 'components/TeamWorkedProjects';
import TeamLinks from 'components/TeamLinks';
import * as actions from './logic/actions';
import TeamAddPeopleModal from 'components/TeamAddPeopleModal';
import CreateLink from 'components/TeamLinks/createLink';
import DeleteLink from 'components/TeamLinks/deleteLink';
export interface Link {
	http: string;
	name: string;
	description: string;
}
const TeamPage = ({ match: { params }, team: { team } }: { match: any; team: any }) => {
	const [notification, setNotification] = useState<boolean>(true);
	const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);
	const [editedLink, setEditedLink] = useState<Link | undefined>();
	const [linkToDelete, setLinkToDelete] = useState<Link | undefined>();
	const [deleteTeamModal, setShowDeleteTeamModal] = useState<boolean>(false);
	const [addLinks, setAddLinks] = useState<boolean>(false);
	const [deleteLink, setDeleteLinks] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.startLoading({ id: params.id }));
	}, []);

	const toggleNotification = (): void => setNotification(false);
	const showAddPeopleModal = (): void => setAddPeopleModal(true);
	const toggleAddLinks = (): void => setAddLinks(!addLinks);
	const toggleDeleteLinkModal = (): void => setDeleteLinks(!deleteLink);
	const editLink = (link: any) => {
		setEditedLink(link);
		setAddLinks(true);
	};
	const onDeleteLink = (link: any) => {
		toggleDeleteLinkModal();
		setLinkToDelete(link);
	};
	return team.id ? (
		<Grid columns="equal" centered>
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
					<TeamLinks
						currentLinks={team.links}
						edit={editLink}
						deleteLink={onDeleteLink}
						addLinks={toggleAddLinks}
					/>
				</Grid.Column>
			</Grid.Row>
			{addPeopleModal && <TeamAddPeopleModal onClose={setAddPeopleModal} />}
			{addLinks && <CreateLink currentLink={editedLink} onClose={toggleAddLinks} />}
			{deleteLink && <DeleteLink onClose={toggleDeleteLinkModal} linkName={linkToDelete?.name} />}
		</Grid>
	) : (
		<span>Loading ...</span>
	);
};
const mapStateToProps = (state: any) => ({
	team: state.team,
});

export default connect(mapStateToProps)(TeamPage);
