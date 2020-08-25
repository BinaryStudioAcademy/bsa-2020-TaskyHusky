import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, Button } from 'semantic-ui-react';

import { RootState } from 'typings/rootState';
import AddPeopleModal from './AddPeopleModal';
import UserAvatar from 'components/common/UserAvatar';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import { startGettingProject } from 'containers/ProjectSettings/logic/actions';

const ProjectPeople = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { isDeleted, idAction } = useSelector((rootState: RootState) => rootState.projectPeople);

	const {
		project,
		project: { users, id: projectId, lead },
	} = useSelector((rootState: RootState) => rootState.project);
	const [searchData, setSearchData] = useState('');

	const usersWithoutLead = useMemo(() => users.filter((user) => user.id !== lead.id), [users, lead.id]);

	if (isDeleted) {
		dispatch(startGettingProject({ id: projectId }));
		dispatch(actions.resetState());
	}

	const onDeleteUser = (usersId: string): void => {
		dispatch(actions.startDeletingUser({ usersId, projectId }));
	};

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const data = event.target.value;
		setSearchData(data);
	};

	const filteredUsers = useMemo(() => {
		if (searchData === '') {
			return usersWithoutLead;
		}

		const searchString = new RegExp(searchData, 'i');

		return usersWithoutLead.filter(({ firstName, lastName, email }) => {
			const username = `${firstName} ${lastName}`;
			const usernameResult = searchString.test(username);
			const emailResult = searchString.test(email);
			return usernameResult || emailResult;
		});
	}, [usersWithoutLead, searchData]);

	return (
		<>
			<div className={styles.body_inner__container}>
				<div className={styles.header_inner__container}>
					<h1 className={styles.header_inner__title}>{t('people')}</h1>
					<AddPeopleModal project={project} />
				</div>
				<Input
					icon="search"
					placeholder="Search for names or email addresses"
					className={styles.body_inner__find}
					onChange={onSearchChange}
					value={searchData}
				/>
				<Table sortable unstackable className={styles.table}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell className={[styles.column__name, styles.table__header_cell].join(' ')}>
								{t('name')}
							</Table.HeaderCell>
							<Table.HeaderCell className={[styles.column__key, styles.table__header_cell].join(' ')}>
								{t('email')}
							</Table.HeaderCell>
							<Table.HeaderCell className={[styles.table__header_cell, styles.user__action].join(' ')}>
								{' '}
								&nbsp;
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{filteredUsers.map((user) => (
							<Table.Row key={user.id}>
								<Table.Cell className={styles.user__username}>
									<UserAvatar user={user} small />
									<span>{`${user.firstName} ${user.lastName}`}</span>
								</Table.Cell>
								<Table.Cell className={styles.user__email}>
									<span>{user.email}</span>
								</Table.Cell>
								<Table.Cell className={styles.user__action}>
									<Button
										basic
										color="blue"
										onClick={() => onDeleteUser(user.id)}
										loading={idAction === user.id}
									>
										Delete
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		</>
	);
};

export default ProjectPeople;
