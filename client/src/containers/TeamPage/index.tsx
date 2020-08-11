import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, connect } from 'react-redux';
import validator from 'validator';
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
import Spinner from 'components/common/Spinner';
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
	const [addLinks, setAddLinks] = useState<boolean>(false);
	const [deleteLink, setDeleteLinks] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.startLoading({ id: params.id }));
	}, [dispatch]);
	const toggleNotification = (): void => setNotification(false);
	const showAddPeopleModal = (): void => setAddPeopleModal(true);
	const toggleAddLinks = (): void => {
		setAddLinks(!addLinks);
		if (addLinks === true) {
			setEditedLink(undefined);
		}
	};
	const toggleDeleteLinkModal = (): void => setDeleteLinks(!deleteLink);
	const editLink = (link: any) => {
		setEditedLink(link);
		setAddLinks(true);
	};
	const onDeleteLink = (link: any) => {
		toggleDeleteLinkModal();
		setLinkToDelete(link);
	};
	const onDeleteLinkAccept = (link: Link) => {
		dispatch(actions.deleteLinkLoading({ id: params.id, link }));
		toggleDeleteLinkModal();
	};
	const changeMainFields = (field: any) => {
		dispatch(actions.updateFieldsLoading({ id: params.id, field }));
	};

	const onEditLinkAccept = (link: any) => {
		let isFullEmpty: boolean = true;
		for (const i in link) {
			if (!validator.isEmpty(link[i])) {
				isFullEmpty = false;
			}
		}
		if (!isFullEmpty) {
			dispatch(actions.addLinkLoading({ id: params.id, link }));
		}
		setAddLinks(false);
	};
	return team.id ? (
		<Grid columns="equal" centered>
			<Grid.Row className={styles.header_z}>
				<div className={[styles.header, styles.team_header].join(' ')}></div>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width="4" className={styles.col_media}>
					<TeamDevsCard
						changeMainFields={changeMainFields}
						description={team.description}
						name={team.name}
						showAddPeopleModal={showAddPeopleModal}
					/>
					<TeamsMembersCard />
				</Grid.Column>
				<Grid.Column width="8" className={styles.col_media}>
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
			{addLinks && <CreateLink onConfirm={onEditLinkAccept} currentLink={editedLink} onClose={toggleAddLinks} />}
			{deleteLink && (
				<DeleteLink onClose={toggleDeleteLinkModal} link={linkToDelete} onDelete={onDeleteLinkAccept} />
			)}
		</Grid>
	) : (
		<Spinner />
	);
};
const mapStateToProps = (state: any) => ({
	team: state.team,
});

export default connect(mapStateToProps)(TeamPage);
