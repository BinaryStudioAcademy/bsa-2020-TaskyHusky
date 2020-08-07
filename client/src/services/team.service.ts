import callWebApi from 'helpers/callApi.helper';

export const getTeam = async (id: string): Promise<WebApi.Entities.Teams[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Teams[];
	} catch (error) {
		console.log(error);
	}
};
