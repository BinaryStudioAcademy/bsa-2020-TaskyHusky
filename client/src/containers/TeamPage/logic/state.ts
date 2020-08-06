export type Team = {
	teamID: string;
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
