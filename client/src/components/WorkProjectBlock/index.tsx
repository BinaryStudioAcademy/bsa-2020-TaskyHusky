import React from 'react';
import ProjectCard from 'components/ProjectCard';
import EmptyCard from 'components/common/EmptyCard';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
	const { projects } = props;
	const stopLoad = 10;
	const additionalLoad = 6;
	return (
		<div className="cardContainer">
			{Boolean(projects.length) ? (
				<>
					{projects.map((item, index) => index < stopLoad && <ProjectCard key={item.id} item={item} />)}
					{projects.map(
						(item, index) =>
							index < additionalLoad && <ProjectCard key={item.id} item={item} additionalBlock={true} />,
					)}
				</>
			) : (
				<EmptyCard content={t('you_do_not_have_projects')} />
			)}
		</div>
	);
};

export default WorkProjectBlock;
