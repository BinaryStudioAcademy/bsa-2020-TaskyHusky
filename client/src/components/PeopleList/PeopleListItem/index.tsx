import React, { ReactElement } from 'react';
import { Card } from 'semantic-ui-react';
import UserAvatar from 'components/common/UserAvatar';
import style from './style.module.scss';

interface Props {
	person: WebApi.Entities.UserProfile;
	handlerClick?: () => void;
}

const PeopleListItem: React.FC<Props> = ({ person, handlerClick }): ReactElement => {
	const { firstName, lastName, jobTitle } = person;
	const fullname = () => `${firstName} ${lastName}`;
	return (
		<Card onClick={() => handlerClick && handlerClick()} className={style.card}>
			<Card.Content>
				<div className={style.avatarWrapper}>
					<UserAvatar user={person} />
				</div>
				<Card.Header>{fullname()}</Card.Header>
				<Card.Meta>{jobTitle}</Card.Meta>
			</Card.Content>
		</Card>
	);
};

export default React.memo(PeopleListItem);
