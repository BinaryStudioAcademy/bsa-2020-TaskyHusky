import callWebApi from 'helpers/callApi.helper';

export const deleteSprint = async (id: string): Promise<any> => {
	const res: Response = await callWebApi({
		method: 'DELETE',
		endpoint: `sprint/${id}`,
	});

	return await res.json();
};
