export enum SETTINGS_SECTION {
	details = 'details',
	people = 'people',
	labels = 'labels',
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
];
