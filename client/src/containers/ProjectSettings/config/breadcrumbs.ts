import { History } from 'history';
import i18n from 'i18next';

import { BreadcrumbItem } from '../../../components/common/Breadcrumbs/index';

interface Params {
	projectName: string;
	history: History;
}

export const setBreadcrumbs = ({ projectName, history }: Params): BreadcrumbItem[] => [
	{
		key: 'Projects',
		content: i18n.t('projects'),
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
		content: i18n.t('project_settings'),
		active: true,
	},
];
