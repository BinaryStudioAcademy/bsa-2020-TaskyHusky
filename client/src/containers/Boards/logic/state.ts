export interface BoardsState {
	boards: WebApi.Board.IBoardModel[];
	recentBoards: WebApi.Board.IReducedBoard[];
}

export const initialState: BoardsState = {
	boards: [],
	recentBoards: [],
};
