import { addingUsers, deletingUsers } from './../containers/ProjectPeople/logic/actionTypes';
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

export const updateProjectUsersList = async ({ usersId, projectId }: addingUsers | deletingUsers): Promise<Keys[]> => {
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
