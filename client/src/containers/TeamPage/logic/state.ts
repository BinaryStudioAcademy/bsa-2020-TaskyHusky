export type Team = {
	id: string;
	name: string;
	description: string;
	links: [];
	color: string;
	users?: WebApi.Entities.UserProfile[];
	projects?: WebApi.Entities.Projects[];
	createdBy: WebApi.Entities.UserProfile | undefined;
	issue?: WebApi.Entities.Issue;
};

export interface TeamState {
	team: Team;
	results: {
		users: {
			results: WebApi.Entities.UserProfile[];
		};
		loading: boolean;
	};
	loading: boolean;
}

export const initialState: TeamState = {
	team: {
		id: '',
		name: '',
		description: '',
		color: '#fffffff',
		links: [],
		users: [],
		projects: [],
		createdBy: undefined,
	},
	loading: false,
	results: {
		users: {
			results: [],
		},
		loading: false,
	},
};
