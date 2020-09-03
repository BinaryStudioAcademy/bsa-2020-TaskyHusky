import React, { useState, memo, useEffect } from 'react';
import { Modal, Button, Dropdown, DropdownOnSearchChangeData } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Props {
	project: WebApi.Entities.Projects;
}

const AddPeopleModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isPeopleLoading, people, isLoading } = useSelector((rootState: RootState) => rootState.projectPeople);
	const { project } = props;
	const { users: projectUsers } = project;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);

	useEffect(() => {
		dispatch(actions.startGettingPeople());
	}, [dispatch]);

	const peopleNotInProject = people.filter((user) =>
		projectUsers.every((projectsUser) => projectsUser.id !== user.id),
	);

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
		dispatch(actions.startAddingUsers({ usersId: selectedUsersIds, project, people }));
		setIsOpen(false);
		setSelectedUsersIds([]);
	};

	return (
		<Modal
			dimmer="inverted"
			size="mini"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			trigger={
				<Button className={styles.primary__button} onClick={() => setIsOpen(true)}>
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
				<Button className={styles.secondary__button} onClick={() => setIsOpen(false)}>
					{t('cancel')}
				</Button>
				<Button className={styles.primary__button} onClick={onAddSelectedUsers} loading={isLoading}>
					{t('add')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default memo(AddPeopleModal);
