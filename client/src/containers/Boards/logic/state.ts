export interface BoardsState {
	boards: WebApi.Board.IBoardModel[];
	recentBoards: WebApi.Board.IBoardModel[];
}

export const initialState: BoardsState = {
	boards: [],
	recentBoards: [],
};
