import callWebApi from 'helpers/callApi.helper';

export const getTeam = async (id: string): Promise<WebApi.Entities.Teams[]> => {
	const res: Response = await callWebApi({
		method: 'GET',
		endpoint: `/team/${id}`,
	});
	console.log(res.json());
	return (await res.json()) as WebApi.Entities.Teams[];
};
