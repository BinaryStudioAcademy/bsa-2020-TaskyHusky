import React from 'react';
import { Header } from 'semantic-ui-react';
import { people } from '../../MockData/people';
import PeopleList from '../../components/PeopleList';

const People = () => {
	return (
		<div>
			<Header as="h2">People</Header>
			<PeopleList people={people} />
			<Header as="h2">Your teams</Header>
		</div>
	);
};

export default People;
