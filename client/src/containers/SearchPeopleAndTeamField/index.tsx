import React, { ReactElement, MouseEvent } from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import style from './style.module.scss';
import debounce from 'lodash-es/debounce';
import ResultPeople from './ResultPeople';
import ResultTeams from './ResultTeams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import * as actions from './logic/actions';

const SearchField: React.FC = (): ReactElement => {
	const dispatch = useDispatch();
	const { isLoading, results } = useSelector((state: RootState) => state.peoplePageSearch);

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		if (value) {
			dispatch(actions.startLoading({ name: value }));
		}
		console.log(results);
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
