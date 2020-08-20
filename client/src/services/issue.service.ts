import { Sort } from 'containers/AdvancedSearch/IssueTable/index';
import callWebApi from 'helpers/callApi.helper';
import { IssueFilter } from 'containers/AdvancedSearch/logic/actionTypes';

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

export const getStatuses = async (): Promise<WebApi.Entities.Priority[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'issue/status',
	});

	return (await res.json()) as WebApi.Entities.Priority[];
};

export const getByKey = async (key: string): Promise<WebApi.Result.IssueResult> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `issue/byKey/${key}`,
	});

	return (await res.json()) as WebApi.Result.IssueResult;
};

export const getById = async (id: string): Promise<WebApi.Result.IssueResult> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `issue/${id}`,
	});

	return (await res.json()) as WebApi.Result.IssueResult;
};

export const updateIssue = async (id: string, data: WebApi.Issue.PartialIssue) => {
	const res: Response = await callWebApi({
		endpoint: `issue/${id}`,
		method: 'PUT',
		body: { ...data },
	});

	return await res.json();
};

export const deleteIssue = async (id: string) => {
	const res: Response = await callWebApi({
		endpoint: `issue/${id}`,
		method: 'DELETE',
	});

	return await res.json();
};

export const updateIssueByKey = async (key: string, data: WebApi.Issue.PartialIssue) => {
	const res: Response = await callWebApi({
		endpoint: `issue/byKey/${key}`,
		method: 'PUT',
		body: { ...data },
	});

	return await res.json();
};

export const getByColumnId = async (id: string): Promise<WebApi.Result.IssueResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `board/column/${id}/issues`,
	});

	return (await res.json()) as WebApi.Result.IssueResult[];
};

export const loadIssuesAndCount = async (
	filter: IssueFilter | undefined,
	from: number | undefined,
	to: number | undefined,
	sort: Sort,
): Promise<WebApi.Result.IssueResult[]> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: `issue/filtered`,
		body: {
			filter,
			from,
			to,
			sort,
		},
	});

	return (await res.json()) as WebApi.Result.IssueResult[];
};

export const addComment = async (id: string, text: string): Promise<WebApi.Result.IssueCommentResult> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'issue/comment',
		body: {
			issue: id,
			text,
		},
	});

	return (await res.json()) as WebApi.Result.IssueCommentResult;
};

export const getComments = async (id: string): Promise<WebApi.Result.IssueCommentResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `issue/comment/byIssue/${id}`,
	});

	return (await res.json()) as WebApi.Result.IssueCommentResult[];
};
