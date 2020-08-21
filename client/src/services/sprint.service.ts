import callWebApi from 'helpers/callApi.helper';

export const deleteSprint = async (id: string): Promise<WebApi.Entities.Sprint> => {
	const res: Response = await callWebApi({
		method: 'DELETE',
		endpoint: `sprint/${id}`,
	});

	return await res.json();
};

export const getSprintIssues = async (id: string): Promise<WebApi.Entities.Issue[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `sprint/${id}/issues`,
	});

	return await res.json();
};

export const updateSprint = async (sprintData: Partial<WebApi.Entities.Sprint>): Promise<WebApi.Entities.Sprint> => {
	const { id, ...data } = sprintData;
	const res: Response = await callWebApi({
		method: 'PUT',
		endpoint: `sprint/${id}`,
		body: {
			...data,
		},
	});

	return await res.json();
};

export const createSprint = async (sprintData: Partial<WebApi.Sprint.SprintModel>): Promise<WebApi.Entities.Sprint> => {
	const res: Response = await callWebApi({
		method: 'POST',
		endpoint: `sprint/`,
		body: {
			...sprintData,
		},
	});

	return await res.json();
};
