import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { people } from '../../MockData/people';
import PeopleList from '../../components/PeopleList';

const People = () => {
	const history = useHistory();

	const redirectToPersonProfile = (id: number | string) => {
		history.push(`/profile/${id}`);
	};

	return (
		<div>
			<Header as="h2">People</Header>
			<PeopleList people={people} handlerClickItem={redirectToPersonProfile} />
			<Header as="h2">Your teams</Header>
		</div>
	);
};

export default People;
