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
			{projects.map(
				(item, index) =>
					index < stopLoad && (
						<ProjectCard
							key={item.id}
							name={item.name}
							category={item.category}
							issues={item.issues}
							avatar={item.avatar}
						/>
					),
			)}
		</div>
	);
};

export default WorkProjectBlock;
