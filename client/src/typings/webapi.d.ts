namespace WebApi.Entities {
	interface Example {
		id: string;
		name?: string;
		text?: string;
	}

	interface Projects {
		projectID: string;
		name: string;
		key: string;
		projectType: string;
		category: string;
		defaultAssigneeID: string;
		leadID: string;
		creatorID: string;
	}
}
