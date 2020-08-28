import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, connect } from 'react-redux';
import validator from 'validator';
import styles from './styles.module.scss';
import TeamDevsCard from 'components/TeamDevsCard';
import TeamsMembersCard from 'components/TeamsMembersCard';
import TeamWorkedProjects from 'components/TeamWorkedProjects';
import TeamLinks from 'components/TeamLinks';
import * as actions from './logic/actions';
import TeamAddPeopleModal from 'components/TeamAddPeopleModal';
import CreateLink from 'components/TeamLinks/createLink';
import DeleteLink from 'components/TeamLinks/deleteLink';
import Spinner from 'components/common/Spinner';
import { RootState } from 'typings/rootState';
import { User } from 'containers/LoginPage/logic/state';

interface Match {
	params: { [key: string]: string };
	isExact: boolean;
	path: string;
	url: string;
}

type Team = {
	team: WebApi.Team.TeamModel;
};
export interface Link {
	http: string;
	name: string;
	description: string;
}
type Props = {
	match: Match;
	currentTeam: Team;
	loading: boolean;
	searchPeople: {
		name?: string;
		results: WebApi.Entities.UserProfile[];
	};
	peopleLoading: boolean;
	currentProfile: User | null;
};

const TeamPage = ({
	match: { params },
	currentTeam: { team },
	loading,
	peopleLoading,
	searchPeople,
	currentProfile,
}: Props) => {
	const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false);
	const [editedLink, setEditedLink] = useState<Link | undefined>();
	const [addLinks, setAddLinks] = useState<boolean>(false);
	const [deleteLink, setDeleteLinks] = useState<boolean>(false);
	const [linkToDelete, setLinkToDelete] = useState<Link>({
		http: '',
		name: '',
		description: '',
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.startLoading({ id: params.id }));
	}, [dispatch, params.id]);
	const showAddPeopleModal = (): void => setAddPeopleModal(true);

	const toggleAddLinks = (): void => {
		setAddLinks(!addLinks);
		if (addLinks === true) {
			setEditedLink(undefined);
		}
	};
	const toggleDeleteLinkModal = (): void => setDeleteLinks(!deleteLink);

	const editLink = (link: Link) => {
		setEditedLink(link);
		setAddLinks(true);
	};

	const onDeleteLink = (link: Link) => {
		toggleDeleteLinkModal();
		setLinkToDelete(link);
	};
	const onDeleteLinkAccept = (link: Link) => {
		dispatch(actions.deleteLinkLoading({ id: params.id, link }));
		toggleDeleteLinkModal();
	};
	const changeMainFields = (field: { [key: string]: string }) => {
		dispatch(actions.updateFieldsLoading({ id: params.id, field }));
	};

	const onEditLinkAccept = (link: Link) => {
		const { name, http, description } = link;
		const checkNotEmpty = (arg: string) => !validator.isEmpty(arg, { ignore_whitespace: true });
		if (checkNotEmpty(name) || checkNotEmpty(http) || checkNotEmpty(description)) {
			dispatch(actions.addLinkLoading({ id: params.id, link }));
		}
		setAddLinks(false);
		setEditedLink(undefined);
	};

	const onSearchPeople = (match: string) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		dispatch(actions.startSearchPeople({ id: currentProfile!.id, match }));
	};

	const onSelectUserInAddUsers = () => dispatch(actions.clearResults());

	const onAddPeopleToTeamConfirm = (users: WebApi.Entities.UserProfile[]) => {
		dispatch(actions.addPeopleToTeamLoading({ id: params.id, users }));
	};
	const handlerRemoveFromTeam = (userId: string) =>
		dispatch(actions.deletePeopleFromTeamLoading({ userId, teamId: team.id }));

	const confirmDeleteTeam = () => dispatch(actions.deleteTeamLoading({ id: team.id }));

	return loading ? (
		<Spinner />
	) : (
		<Grid columns="equal" centered className={styles.page_main}>
			<Grid.Row>
				<div className={styles.header}></div>
			</Grid.Row>
			<Grid.Row className={styles.main_row}>
				<Grid.Column className={`${styles.col_media} ${styles.col_left}`}>
					<TeamDevsCard
						confirmDelete={confirmDeleteTeam}
						currentProfile={currentProfile}
						teamOwner={team.createdBy}
						changeMainFields={changeMainFields}
						description={team.description}
						name={team.name}
						showAddPeopleModal={showAddPeopleModal}
					/>
					<TeamsMembersCard
						teammates={[{ ...team.createdBy }]}
						title={'team_owner'}
						removeUserFromTeam={handlerRemoveFromTeam}
					/>
					<TeamsMembersCard
						teammates={team.users}
						title={'members'}
						removeUserFromTeam={handlerRemoveFromTeam}
					/>
				</Grid.Column>
				<Grid.Column className={`${styles.col_media}, ${styles.col_right}`}>
					<TeamWorkedProjects projects={team.projects} />
					<TeamLinks
						currentLinks={team.links ?? []}
						edit={editLink}
						deleteLink={onDeleteLink}
						addLinks={toggleAddLinks}
					/>
				</Grid.Column>
			</Grid.Row>
			{addPeopleModal && (
				<TeamAddPeopleModal
					clearStateAfterSelect={onSelectUserInAddUsers}
					searchLoading={peopleLoading}
					people={searchPeople}
					search={onSearchPeople}
					onClose={setAddPeopleModal}
					onConfirm={onAddPeopleToTeamConfirm}
				/>
			)}
			{addLinks && <CreateLink onConfirm={onEditLinkAccept} currentLink={editedLink} onClose={toggleAddLinks} />}
			{deleteLink && (
				<DeleteLink onClose={toggleDeleteLinkModal} link={linkToDelete} onDelete={onDeleteLinkAccept} />
			)}
		</Grid>
	);
};

const mapStateToProps = (state: RootState) => ({
	currentTeam: state.team,
	loading: state.team.loading,
	searchPeople: state.team.results.users,
	peopleLoading: state.team.results.loading,
	currentProfile: state.auth.user,
});

export default connect(mapStateToProps)(TeamPage);
