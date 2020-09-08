export enum SETTINGS_SECTION {
	details = 'details',
	backlog = 'backlog',
	activeSprint = 'active_sprint',
	reports = 'reports',
}

export const sidebarItems = [
	{
		section: SETTINGS_SECTION.details,
		icon: 'setting',
	},
	{
		section: SETTINGS_SECTION.backlog,
		icon: 'clipboard list',
	},
	{
		section: SETTINGS_SECTION.activeSprint,
		icon: 'columns',
	},
	{
		section: SETTINGS_SECTION.reports,
		icon: 'chart line',
	},
];
