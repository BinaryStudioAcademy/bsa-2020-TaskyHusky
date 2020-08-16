export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
}

export const initialState: ScrumBoardState = {
	sprints: [],
};
