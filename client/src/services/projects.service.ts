import callWebApi from './../helpers/callApi.helper';
import { InitialProject } from './../containers/CreateProjectModal/logic/actionTypes';

export const getProjects = async (): Promise<WebApi.Entities.Projects[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: 'projects',
	});

	return (await res.json()) as WebApi.Entities.Projects[];
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
