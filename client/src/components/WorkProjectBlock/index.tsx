import React from 'react';
import ProjectCard from 'components/ProjectCard';

interface Props {
	projects: Array<{
		name: string;
		id: string;
		avatar?: string;
		category?: string;
		updatedDate?: Date;
		issues?: Partial<WebApi.Entities.Issue>[];
	}>;
}

const WorkProjectBlock: React.FC<Props> = (props: Props) => {
	const { projects } = props;
	const stopLoad = 6;
	return (
		<div className="cardContainer">
			{projects.map((item, index) => index < stopLoad && <ProjectCard key={item.id} item={item} />)}
		</div>
	);
};

export default WorkProjectBlock;
