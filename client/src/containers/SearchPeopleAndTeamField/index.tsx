import React, { ReactElement, MouseEvent, useState } from 'react';
import { Search, SearchProps, SearchResultProps, Image, Card } from 'semantic-ui-react';
import style from './style.module.scss';
import debounce from 'lodash-es/debounce';
import { Team } from '../../fakeServer/mockData/teams';
import { fetchTeamsByNameFilter } from '../../services/team.service';
import { fetchPeopleByFullNameFilter } from '../../services/people.service';
import ResultPeople from './ResultPeople';
import ResultTeams from './ResultTeams';

interface Result {
	users: {
		name: string;
		results: WebApi.Entities.UserProfile[];
	};
	teams: {
		name: string;
		results: Team[];
	};
}

const SearchField: React.FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [results, setResults] = useState<any | null>(null);

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		setIsLoading(true);

		Promise.all([fetchTeamsByNameFilter(value), fetchPeopleByFullNameFilter(value)])
			.then((response) => {
				const [teams, users] = response;
				setResults({
					users: { name: 'users', results: users },
					teams: { name: 'teams', results: teams },
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const resultRender = (value: any): ReactElement => {
		if (value.firstName) {
			return ResultPeople(value);
		}

		const { name, color, id, creator } = value;
		return <ResultTeams name={name} color={color} id={id} creator={creator} />;
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
