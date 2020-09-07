import { History } from 'history';
import i18n from 'i18next';

import { BreadcrumbItem } from 'components/common/Breadcrumbs/index';

interface Params {
	name: string;
	history: History;
	id?: string;
}

export const setBreadcrumbs = ({ name, history, id }: Params): BreadcrumbItem[] => [
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
		onClick: () => history.push(`/project/${id}/issues`),
	},
	{
		key: 'Project settings',
		content: i18n.t('project_settings'),
		active: true,
	},
];
