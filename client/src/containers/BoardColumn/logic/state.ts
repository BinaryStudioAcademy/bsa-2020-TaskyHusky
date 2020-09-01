export interface BoardColumnState {
	columnCreated: boolean;
	recentlyCreatedColumn?: WebApi.Result.BoardColumnResult;
}

export const initialState: BoardColumnState = {
	columnCreated: false,
};
