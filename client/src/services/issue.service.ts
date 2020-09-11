import { Sort } from 'containers/AdvancedSearch/IssueTable/index';
import callWebApi from 'helpers/callApi.helper';
import { IssueFilter } from 'containers/AdvancedSearch/logic/actionTypes';

export const createIssue = async (params: WebApi.Result.IssueResult): Promise<WebApi.Result.IssueResult> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'issue',
		body: params,
	});

	return (await res.json()) as WebApi.Result.IssueResult;
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
	inputText: string | undefined,
): Promise<WebApi.Result.IssueResult[]> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: `issue/filtered`,
		body: {
			filter,
			from,
			to,
			sort,
			inputText,
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

export const deleteComment = async (id: string): Promise<void> => {
	await callWebApi({
		method: 'DELETE',
		endpoint: `issue/comment/${id}`,
	});
};

export const getComments = async (id: string): Promise<WebApi.Result.IssueCommentResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `issue/comment/byIssue/${id}`,
	});

	return (await res.json()) as WebApi.Result.IssueCommentResult[];
};

export const getCommits = async (id: string): Promise<WebApi.Result.CommitResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `commits/${id}`,
	});

	return (await res.json()) as WebApi.Result.CommitResult[];
};

export const getIssuesByBoardId = async (id: string): Promise<WebApi.Result.IssueResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `issue/${id}/boardIssues`,
	});

	return await res.json();
};

export const watch = async (id: string): Promise<void> => {
	await callWebApi({
		method: 'POST',
		endpoint: `issue/${id}/watch`,
	});
};

export const attachFile = async (file: File, issueKey: string): Promise<string> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'issue/attachment',
		attachment: file,
		attachmentFieldName: 'file',
		query: {
			issueKey,
		},
	});

	return ((await res.json()) as { newLink: string }).newLink;
};

export const bulkAttach = (files: File[], issueKey: string): Promise<string[]> => {
	return Promise.all(files.map((file) => attachFile(file, issueKey)));
};

export const reindexInColumns = (map: { [column: string]: string[] }) => {
	callWebApi({
		method: 'POST',
		endpoint: 'issue/reindex/columns',
		body: map,
	});
};
