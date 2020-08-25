export interface BoardsState {
	boards: WebApi.Board.IBoardModel[];
	recentBoards: WebApi.Board.IReducedBoard[];
	isLoading: boolean;
}

export const initialState: BoardsState = {
	boards: [],
	recentBoards: [],
	isLoading: true,
};
