namespace WebApi.Entities {
	interface Example {
		id: string;
		name?: string;
		text?: string;
	}
}

namespace WebApi.Results {
	interface UserAuthResult {
		id: string;
		token: string;
		email: string;
	}
}
