import { History } from 'history';
import i18n from 'i18next';
import { BreadcrumbItem } from 'components/common/Breadcrumbs/index';

export type BreadCrumbData = {
	id: string;
	name: string;
};
interface Params {
	projectDetails: BreadCrumbData;
	boardDetails: BreadCrumbData;
	history: History;
}

export const setBreadcrumbs = ({ projectDetails, boardDetails, history }: Params): BreadcrumbItem[] => {
	const { id: projectId, name: projectName } = projectDetails;
	const { id: boardId, name: boardName } = boardDetails;

	return [
		{
			key: 'Projects',
			content: i18n.t('projects'),
			link: true,
			onClick: () => history.push('/projects'),
		},
		{
			key: String(projectId),
			content: projectName,
			link: true,
			onClick: () => history.push(`/projects/${projectId}/`),
		},
		{
			key: boardId,
			content: boardName,
			active: true,
		},
	];
};
