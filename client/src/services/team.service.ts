import callWebApi from '../helpers/callApi.helper';

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
		endpoint: 'fake/teams',
	});

	return await res.json();
};

export const fetchTeamsByNameFilter = async (name: string | undefined) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'fake/teams',
		query: {
			name,
		},
	});

	return await res.json();
};

export const addTeam = async (name: string) => {
	const res = await callWebApi({
		method: 'POST',
		endpoint: 'fake/teams',
		body: {
			name,
		},
	});

	return await res.json();
};
