import callWebApi from 'helpers/callApi.helper';

export async function createIssue(params: WebApi.Entities.Issue): Promise<WebApi.Entities.Issue> {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'issue',
		body: params,
	});

	return (await res.json()) as WebApi.Entities.Issue;
}
