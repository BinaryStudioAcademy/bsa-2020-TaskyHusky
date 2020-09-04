export enum SETTINGS_SECTION {
	details = 'details',
	people = 'people',
	versions = 'versions',
	labels = 'labels',
	permissions = 'permissions',
}

export const sidebarItems = [
	{
		section: SETTINGS_SECTION.details,
		icon: 'setting',
	},
	{
		section: SETTINGS_SECTION.people,
		icon: 'street view',
	},
	{
		section: SETTINGS_SECTION.labels,
		icon: 'tags',
	},
	{
		section: SETTINGS_SECTION.permissions,
		icon: 'key',
	},
];
