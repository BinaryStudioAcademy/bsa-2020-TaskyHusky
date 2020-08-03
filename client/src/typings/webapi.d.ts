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
		jwtToken: string;
		email: string;
	}
}
