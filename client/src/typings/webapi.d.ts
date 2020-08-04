namespace WebApi.Result {
	interface UserAuthResult {
		id: string;
		jwtToken: string;
		email: string;
	}
}

namespace WebApi.Entities {
	interface Example {
		id: string;
		name?: string;
		text?: string;
	}

	interface IssueType {
		id: string;
		icon?: string;
		color?: string;
		title?: string;
	}

	interface Priority {
		id: string;
		icon?: string;
		color?: string;
		title?: string;
	}
}
