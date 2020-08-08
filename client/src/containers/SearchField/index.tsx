import React, { ReactElement, MouseEvent, useState } from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import style from './style.module.scss';
import debounce from 'lodash-es/debounce';
import { Team } from '../../fakeServer/mockData/teams';
import { addTeam } from '../../services/team.service';

const SearchField: React.FC = (): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [result, setResult] = useState<WebApi.Entities.User[] | Team[]>([]);

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		setIsLoading(true);
	};

	return (
		<Search
			onSearchChange={debounce(handlerChange, 500, { maxWait: 1000 })}
			loading={isLoading}
			className={style.field}
			size="large"
			input={{ fluid: true }}
			result={result}
		/>
	);
};

export default React.memo(SearchField);
