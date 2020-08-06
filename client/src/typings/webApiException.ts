export interface WebApiException {
	status: number;
	statusText: string;
	url: string;
	clientException: any;
}
