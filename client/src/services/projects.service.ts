const projects = [
	{
		projectID: '1',
		name: 'first',
		key: 'someKey',
		projectType: 'Type',
		category: 'category',
		defaultAssigneeID: 'string',
		leadID: 'string',
		creatorID: 'string',
	},
	{
		projectID: '2',
		name: 'second',
		key: 'someKey',
		projectType: 'Type',
		category: 'category',
		defaultAssigneeID: 'string',
		leadID: 'string',
		creatorID: 'string',
	},
];

export const getProjects = async (): Promise<WebApi.Entities.Projects> => {
	return { projects };
};
