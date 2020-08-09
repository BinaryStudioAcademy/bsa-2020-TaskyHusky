import { BreadcrumbItem } from '../../../components/common/Breadcrumbs/index';
import { History } from 'history';

interface Params {
	projectName: string;
	history: History;
}

export const setBreadcrumbs = ({ projectName, history }: Params): BreadcrumbItem[] => [
	{
		key: 'Projects',
		content: 'Projects',
		link: true,
		onClickAction: () => history.push('/projects'),
	},
	{
		key: projectName,
		content: projectName,
		link: true,
		onClickAction: () => history.push(`/projects/${projectName}/${projectName} board`),
	},
	{
		key: 'Project settings',
		content: 'Project settings',
		active: true,
	},
];
