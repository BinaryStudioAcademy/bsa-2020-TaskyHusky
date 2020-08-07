export type Team = {
	id: string;
	name: string;
	description: string;
	links: string[];
	members: [];
};

export interface TeamState {
	team: Team[];
}

export const initialState: TeamState = {
	team: [],
};
