import { History } from 'history';
import i18n from 'i18next';
import { BreadcrumbItem } from 'components/common/Breadcrumbs/index';

interface Params {
	projectDetails: Partial<WebApi.Entities.Projects>;
	boardDetails: Partial<WebApi.Entities.Board>;
	history: History;
}

export const setBreadcrumbs = ({ projectDetails, boardDetails, history }: Params): BreadcrumbItem[] => {
	const { id: projectId, name: projectName } = projectDetails as { id: string; name: string };
	const { id: boardId, name: boardName } = boardDetails as { id: string; name: string };

	return [
		{
			key: 'Projects',
			content: i18n.t('projects'),
			link: true,
			onClick: () => history.push('/projects'),
		},
		{
			key: projectId,
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
