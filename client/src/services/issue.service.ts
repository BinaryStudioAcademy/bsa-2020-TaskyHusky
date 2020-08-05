import callWebApi from 'helpers/callApi.helper';

export const createIssue = async (params: WebApi.Entities.Issue): Promise<WebApi.Entities.Issue> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'issue',
		body: params,
	});

	return (await res.json()) as WebApi.Entities.Issue;
};

export const getTypes = async (): Promise<WebApi.Entities.IssueType[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'issue/type',
	});

	return (await res.json()) as WebApi.Entities.IssueType[];
};

export const getPriorities = async (): Promise<WebApi.Entities.Priority[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'issue/priority',
	});

	return (await res.json()) as WebApi.Entities.Priority[];
};
