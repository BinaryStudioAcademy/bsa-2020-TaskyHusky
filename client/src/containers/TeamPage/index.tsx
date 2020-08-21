import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, connect } from 'react-redux';
import validator from 'validator';
import styles from './styles.module.scss';
import TeamDevsCard from 'components/TeamDevsCard';
import TeamsMembersCard from 'components/TeamsMembersCard';
//import TeamWorkedProjects from 'components/TeamWorkedProjects';
import TeamLinks from 'components/TeamLinks';
import * as actions from './logic/actions';
import TeamAddPeopleModal from 'components/TeamAddPeopleModal';
import CreateLink from 'components/TeamLinks/createLink';
import DeleteLink from 'components/TeamLinks/deleteLink';
import Spinner from 'components/common/Spinner';
import { RootState } from 'typings/rootState';
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
};

const TeamPage = ({ match: { params }, currentTeam: { team }, loading }: Props) => {
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

	return loading ? (
		<Spinner />
	) : (
		<Grid columns="equal" centered className={styles.page_main}>
			<Grid.Row className={styles.header_z}>
				<div className={[styles.header, styles.team_header].join(' ')}></div>
			</Grid.Row>
			<Grid.Row className={styles.main_row}>
				<Grid.Column className={[styles.col_media, styles.col_left].join(' ')}>
					<TeamDevsCard
						changeMainFields={changeMainFields}
						description={team.description}
						name={team.name}
						showAddPeopleModal={showAddPeopleModal}
					/>
					<TeamsMembersCard teammates={[{ ...team.createdBy }]} title={'Team owner'} />
					<TeamsMembersCard teammates={team.users} title={'Members'} />
				</Grid.Column>
				<Grid.Column className={[styles.col_media, styles.col_right].join(' ')}>
					{/* <TeamWorkedProjects projects={team.projects} /> */}
					<TeamLinks
						currentLinks={team.links ?? []}
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
	);
};

const mapStateToProps = (state: RootState) => ({
	currentTeam: state.team,
	loading: state.team.loading,
});

export default connect(mapStateToProps)(TeamPage);
