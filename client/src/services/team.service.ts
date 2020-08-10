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

export const updateLinks = async (id: string, data: any): Promise<WebApi.Entities.Teams[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'PUT',
			body: { data },
			endpoint: `team/fields/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Teams[];
	} catch (error) {
		console.log(error);
	}
};

export const deleteOneLink = async (id: string, data: any): Promise<WebApi.Entities.Teams[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'DELETE',
			body: { data },
			endpoint: `team/fields/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Teams[];
	} catch (error) {
		console.log(error);
	}
};

export const updateFieldById = async (id: string, field: any): Promise<WebApi.Entities.Teams[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'PUT',
			body: field,
			endpoint: `team/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Teams[];
	} catch (error) {
		console.log(error);
	}
};
