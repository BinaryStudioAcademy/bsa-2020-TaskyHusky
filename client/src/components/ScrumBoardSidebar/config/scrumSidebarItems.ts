export enum SETTINGS_SECTION {
	settings = 'settings',
	backlog = 'backlog',
	activeSprint = 'active_sprint',
	reports = 'reports',
	issues = 'issues',
}

export const sidebarItems = [
	{
		section: SETTINGS_SECTION.settings,
		icon: 'setting',
	},
	{
		section: SETTINGS_SECTION.backlog,
		icon: 'clipboard list',
	},
	{
		section: SETTINGS_SECTION.issues,
		icon: 'clipboard check',
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
