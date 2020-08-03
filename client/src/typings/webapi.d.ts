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
}
