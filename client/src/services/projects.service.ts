import { Label } from 'containers/ProjectLabels/logic/actionTypes';
import * as actionTypes from 'containers/ProjectPeople/logic/actionTypes';
import { ProjectId } from '../containers/ProjectSettings/logic/actionTypes';
import callWebApi from './../helpers/callApi.helper';
import { InitialProject, Keys } from './../containers/CreateProjectModal/logic/actionTypes';

export const getProjects = async (): Promise<WebApi.Entities.Projects[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'projects',
	});

	return (await res.json()) as WebApi.Entities.Projects[];
};

export const getProjectById = async (id: string): Promise<WebApi.Entities.Projects> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `projects/${id}`,
	});

	return (await res.json()) as WebApi.Entities.Projects;
};

export const createProject = async (project: InitialProject): Promise<WebApi.Entities.Projects> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'projects',
		body: {
			project,
		},
	});

	return (await res.json()) as WebApi.Entities.Projects;
};

export const getProjectIssues = async (id: string): Promise<WebApi.Result.IssueResult[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `projects/${id}/issues`,
	});

	return (await res.json()) as WebApi.Result.IssueResult[];
};

export const updateProject = async (project: WebApi.Entities.Projects): Promise<WebApi.Entities.Projects> => {
	const res: Response = await callWebApi({
		method: 'PUT',
		endpoint: 'projects',
		body: {
			project,
		},
	});

	return (await res.json()) as WebApi.Entities.Projects;
};

export const deleteProject = async (id: ProjectId): Promise<WebApi.Entities.Projects> => {
	const res: Response = await callWebApi({
		method: 'DELETE',
		endpoint: 'projects',
		body: {
			id,
		},
	});

	return (await res.json()) as WebApi.Entities.Projects;
};

export const getAllKeys = async (): Promise<Keys[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'projects/keys',
	});

	return (await res.json()) as Keys[];
};

export const updateProjectUsersList = async ({ usersId, projectId }: actionTypes.UpdatingUsers): Promise<Keys[]> => {
	const res: Response = await callWebApi({
		method: 'PUT',
		endpoint: 'projects/users',
		body: {
			usersId,
			projectId,
		},
	});

	return (await res.json()) as Keys[];
};

export const addLabel = async ({ project, label }: Label): Promise<WebApi.Entities.ProjectLabel> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: 'projects/label',
		body: {
			projectId: project.id,
			label,
		},
	});

	return (await res.json()) as WebApi.Entities.ProjectLabel;
};

export const updateLabel = async ({ project, label }: Label): Promise<WebApi.Entities.ProjectLabel> => {
	const res: Response = await callWebApi({
		method: 'PUT',
		endpoint: 'projects/label',
		body: {
			projectId: project.id,
			label,
		},
	});

	return (await res.json()) as WebApi.Entities.ProjectLabel;
};

export const deleteLabel = async ({
	projectId,
	labelId,
}: {
	projectId: string;
	labelId: string;
}): Promise<WebApi.Entities.ProjectLabel> => {
	const res: Response = await callWebApi({
		method: 'DELETE',
		endpoint: 'projects/label',
		body: {
			projectId,
			labelId,
		},
	});

	return (await res.json()) as WebApi.Entities.ProjectLabel;
};
