import React from 'react';
import folder from 'icons/profile/folder.svg';

type Props = {
	title?: string;
	content?: string;
};

const EmptyCard: React.FC<Props> = ({ title, content }) => {
	return (
		<div className="emptyCard" style={{ flexDirection: 'column' }}>
			<img src={folder} alt="" />
			<div>
				<p className="standartHeader">{title}</p>
				<p className="standartLabel">{content}</p>
			</div>
		</div>
	);
};

export default EmptyCard;
