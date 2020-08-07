import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

type Props = {
	link: {
		http: string;
		name: string;
		description: string;
	};
};

const LinkCard = ({ link }: Props) => {
	console.log(link);
	return (
		<Card fluid>
			<Card.Content header={link.name} />
			<Card.Content description={link.description} />
			<Card.Content description={link.http} />
		</Card>
	);
};

export default LinkCard;
