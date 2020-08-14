import React from 'react';
import ProfilePage from 'containers/ProfilePage';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			id: string;
		};
	};
}
const profilePage: React.FC<Props> = ({ match }: Props) => {
	const {
		params: { id },
	} = match;

	return (
		<DefaultPageWrapper>
			<ProfilePage id={id} />
		</DefaultPageWrapper>
	);
};

export default profilePage;
