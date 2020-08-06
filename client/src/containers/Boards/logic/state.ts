export interface BoardsState {
	boards: WebApi.Board.IBoardModel[];
}

export const initialState: BoardsState = {
	boards: [],
};
