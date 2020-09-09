import React from 'react';
import ProjectCard from 'components/ProjectCard';

interface Props {
	projects: Array<{
		name: string;
		id: string;
		avatar?: string;
		color?: string;
		category?: string;
		updatedDate?: Date;
		issues?: Partial<WebApi.Entities.Issue>[];
	}>;
}

const WorkProjectBlock: React.FC<Props> = (props: Props) => {
	const { projects } = props;
	const stopLoad = 10;
	const additionalLoad = 6;
	return (
		<div className="cardContainer">
			{projects.map((item, index) => index < stopLoad && <ProjectCard key={item.id} item={item} />)}
			{projects.map(
				(item, index) =>
					index < additionalLoad && <ProjectCard key={item.id} item={item} additionalBlock={true} />,
			)}
		</div>
	);
};

export default WorkProjectBlock;
