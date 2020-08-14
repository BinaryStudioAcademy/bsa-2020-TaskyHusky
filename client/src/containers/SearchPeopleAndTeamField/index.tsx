import React, { ReactElement, MouseEvent, useState } from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import style from './style.module.scss';
import debounce from 'lodash-es/debounce';
import { fetchTeamsByNameFilter } from '../../services/team.service';
import { fetchPeopleByFullNameFilter } from '../../services/people.service';
import ResultPeople from './ResultPeople';
import ResultTeams from './ResultTeams';

const SearchField: React.FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [results, setResults] = useState<any | null>(null);

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		setIsLoading(true);

		Promise.all([fetchTeamsByNameFilter(value), fetchPeopleByFullNameFilter(value)])
			.then((response) => {
				const [teams, users] = response;

				const userResult = users.map((user) => ({ data: user, title: '', key: user.id }));
				const teamResult = teams.map((team: any) => ({ data: team, title: '', key: team.id }));

				setResults({
					users: { name: 'users', results: userResult },
					teams: { name: 'teams', results: teamResult },
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const resultRender = (value: any): React.ReactElement => {
		if ((value.data as WebApi.Entities.UserProfile).firstName) {
			const { firstName, lastName, id, email, avatar } = value.data as WebApi.Entities.UserProfile;
			return <ResultPeople id={id} firstName={firstName} lastName={lastName} email={email} avatar={avatar} />;
		}

		const team = value.data as WebApi.Entities.Team;
		const { name, color, id, createdBy } = team;
		if (name && color && createdBy) {
			return <ResultTeams name={name} color={color} id={id} createdBy={createdBy} />;
		}

		return <div />;
	};

	return (
		<>
			<Search
				category
				onSearchChange={debounce(handlerChange, 500, { maxWait: 1000 })}
				loading={isLoading}
				className={style.field}
				size="large"
				input={{ fluid: true, placeholder: 'Search for people and teams' }}
				results={results}
				resultRenderer={resultRender}
			/>
		</>
	);
};

export default React.memo(SearchField);
