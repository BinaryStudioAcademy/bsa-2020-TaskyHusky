interface UserAuthResult {
	user: {
		id: string;
		email: string;
	};
	jwtToken: string;
}
