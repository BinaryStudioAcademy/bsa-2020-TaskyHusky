const projects = [
	{
		id: '1',
		name: 'first',
		key: 'someKey',
		projectType: 'Type',
		category: 'category',
		defaultAssigneeID: 'string',
		leadID: 'string',
		creatorID: 'string',
	},
	{
		id: '2',
		name: 'second',
		key: 'someKey',
		projectType: 'Type',
		category: 'category',
		defaultAssigneeID: 'string',
		leadID: 'string',
		creatorID: 'string',
	},
];

export const getProjects = async (): Promise<WebApi.Entities.Projects[]> => {
	return projects;
};
