import callWebApi from 'helpers/callApi.helper';
import history from 'helpers/history.helper';

export const getTeam = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		history.push('/not-found-404');
	}
};

export const getTeamsUsers = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/users/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
	}
};

export const getTeamsProjects = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/projects/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
	}
};

export const getTeamsIssues = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/issues/${id}`,
		});
		return (await res.json()) as WebApi.Entities.Team[];
	} catch (error) {
		console.log(error);
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

export const findUsersColleagues = async (id: string, match?: string) => {
	const result = await callWebApi({
		method: 'POST',
		endpoint: 'user/search',
		body: {
			id,
			match,
		},
	});
	const searchResult: { data: WebApi.Entities.UserProfile; key: string; title?: string }[] = [];
	const users = await result.json();
	users.forEach((el: WebApi.Entities.UserProfile) => {
		searchResult.push({
			data: el,
			key: el.id,
			title: el.firstName,
		});
	});
	return searchResult;
};

export const addUsersToTeam = async (id: string, users?: WebApi.Entities.UserProfile[]) => {
	const result = await callWebApi({
		method: 'POST',
		endpoint: 'team/connect-to-team',
		body: {
			id,
			users,
		},
	});
	return (await result.json()) as WebApi.Entities.UserProfile[];
};

export const deleteTeamRequest = async (id: string) => {
	const result = await callWebApi({
		method: 'DELETE',
		endpoint: `team/${id}`,
	});
	return await result.json();
};

export const removeUserFromTeamRequest = async (userId: string, teamId: string) => {
	const result = await callWebApi({
		method: 'POST',
		endpoint: `team/users`,
		body: {
			userId,
			teamId,
		},
	});
	return await result.json();
};
