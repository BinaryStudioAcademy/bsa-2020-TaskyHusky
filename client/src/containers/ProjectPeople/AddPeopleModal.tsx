import React, { useState, useMemo, memo, useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownOnSearchChangeData } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { startGettingProject } from 'containers/ProjectSettings/logic/actions';
import { useTranslation } from 'react-i18next';

interface Props {
	project: WebApi.Entities.Projects;
}

const AddPeopleModal = ({ project: { id: projectId, lead, users: projectUsers } }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isPeopleLoading, people, isLoading, isAdded } = useSelector(
		(rootState: RootState) => rootState.projectPeople,
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);

	useEffect(() => {
		dispatch(actions.startGettingPeople());
	}, [dispatch]);

	const peopleNotInProject = useMemo(
		() =>
			people.filter((user) =>
				projectUsers.some((projectsUser) => projectsUser.id !== user.id && user.id !== lead.id),
			),
		[people, projectUsers, lead.id],
	);

	if (isAdded) {
		dispatch(actions.resetState());
		setIsOpen(false);
		dispatch(startGettingProject({ id: projectId }));
	}

	const onSearchQueryChange = (
		event: React.SyntheticEvent<HTMLElement, Event>,
		{ searchQuery: query }: DropdownOnSearchChangeData,
	): void => {
		setSearchQuery(query);
	};

	const onSearchDataChange = (event: React.SyntheticEvent<HTMLElement, Event>, { value: selectedIds }: any): void => {
		setSelectedUsersIds(selectedIds);
	};

	const onAddSelectedUsers = () => {
		dispatch(actions.startAddingUsers({ usersId: selectedUsersIds, projectId }));
	};

	return (
		<Modal
			dimmer="inverted"
			size={'mini'}
			open={isOpen}
			onClose={() => setIsOpen(false)}
			trigger={
				<Button primary onClick={() => setIsOpen(true)}>
					{t('add_people')}
				</Button>
			}
		>
			<Modal.Header>{t('add_people')}</Modal.Header>
			<Modal.Content>
				<Dropdown
					loading={isPeopleLoading}
					disabled={isPeopleLoading}
					fluid
					multiple
					onChange={onSearchDataChange}
					onSearchChange={onSearchQueryChange}
					options={peopleNotInProject.map((user) => ({
						key: user.id,
						value: user.id,
						text: `${user.firstName} ${user.lastName}`,
					}))}
					placeholder={isPeopleLoading ? t('loading') : t('people')}
					search
					searchQuery={searchQuery}
					selection
					value={selectedUsersIds}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => setIsOpen(false)}>{t('cancel')}</Button>
				<Button primary onClick={onAddSelectedUsers} loading={isLoading}>
					{t('add')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default memo(AddPeopleModal);
