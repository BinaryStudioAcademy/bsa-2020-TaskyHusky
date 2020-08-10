import { History } from 'history';
import i18n from 'i18next';

import { BreadcrumbItem } from 'components/common/Breadcrumbs/index';

interface Params {
	name: string;
	history: History;
}

export const setBreadcrumbs = ({ name, history }: Params): BreadcrumbItem[] => [
	{
		key: 'Projects',
		content: i18n.t('projects'),
		link: true,
		onClick: () => history.push('/projects'),
	},
	{
		key: name,
		content: name,
		link: true,
		onClick: () => history.push(`/projects/${name}/${name} board`),
	},
	{
		key: 'Project settings',
		content: i18n.t('project_settings'),
		active: true,
	},
];
