import callWebApi from 'helpers/callApi.helper';

export const getTeam = async (id: string): Promise<WebApi.Entities.Team[] | undefined> => {
	try {
		const res: Response = await callWebApi({
			method: 'GET',
			endpoint: `team/${id}`,
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

const members = [
	{
		id: 101,
		avatar:
			'https://i7.pngflow.com/pngimage/779/60/png-computer-icons-login-avatar-avatar-heroes-silhouette-user-symbol-clipart.png',
		name: 'Vladimir Barkalov',
		position: 'Java developer',
	},
	{
		id: 102,
		avatar: 'https://images.clipartlogo.com/files/istock/previews/9859/98596917-worker-avatar-icon.jpg',
		name: 'Yaroslav Pryhoda',
		position: 'Web developer',
	},
];

export const teamMembers = () => {
	return members;
};

export const fetchTeams = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'team',
	});

	return (await res.json()) as WebApi.Entities.Team[];
};

export const fetchTeamsByNameFilter = async (name: string | undefined) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'team',
		query: {
			name,
		},
	});

	return await res.json();
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
