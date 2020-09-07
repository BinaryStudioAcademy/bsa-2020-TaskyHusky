export type IssuesToSprint = {
	[sprintId: string]: WebApi.Result.IssueResult[];
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssuesToSprint: IssuesToSprint;
	backlog: WebApi.Result.IssueResult[];
	project: WebApi.Result.BoardProjectsResult;
	board: WebApi.Result.BoardResult;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssuesToSprint: {},
	backlog: [],
	project: {
		id: '',
		name: '',
		key: '',
		description: '',
		icon: '',
		category: '',
		createdDate: undefined,
		updatedDate: undefined,
		deletedDate: undefined,
	},
	board: {
		id: '',
		boardType: WebApi.Board.BoardType.Kanban,
		name: '',
		location: '',
		createdAt: {
			firstName: '',
			lastName: '',
			id: '',
			avatar: '',
		},
	},
};
