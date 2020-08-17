import callWebApi from 'helpers/callApi.helper';
import { modifiedEntity } from '../containers/SearchPeopleAndTeamField/logic/state';

export const getTeam = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		window.location.replace('/not-found-404');
	}
};

export const updateLinks = async (id: string, data: any): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'PUT',
			body: { data },
			endpoint: `team/fields/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
	}
};
export const deleteOneLink = async (id: string, data: any): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'DELETE',
			body: { data },
			endpoint: `team/fields/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
	}
};

export const updateFieldById = async (id: string, field: any): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'PUT',
			body: field,
			endpoint: `team/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
	}
};

export const fetchTeams = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'team',
	});

	return (await res.json()) as WebApi.Entities.Team[];
};

export const fetchTeamsByNameFilter = async (
	name: string | undefined,
): Promise<modifiedEntity<WebApi.Entities.Team>[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'team',
		query: {
			name,
		},
	});

	const teams = (await res.json()) as WebApi.Entities.Team[];

	return teams.map((team) => ({ data: team, title: '', key: team.id }));
};

export const addTeam = async (name: string) => {
	const res = await callWebApi({
		method: 'POST',
		endpoint: 'team',
		body: {
			name,
		},
	});

	return await res.json();
};
