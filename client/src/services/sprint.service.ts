import callWebApi from 'helpers/callApi.helper';

export const deleteSprint = async (id: string): Promise<any> => {
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
