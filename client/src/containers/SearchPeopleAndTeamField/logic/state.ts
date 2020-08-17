export interface modifiedEntity<T> {
	data: T;
	title: string;
	key: string;
}

export interface PeoplePagesSearchState {
	results:
		| {
				users: {
					name: 'users';
					results: modifiedEntity<WebApi.Entities.UserProfile>[];
				};
				teams: {
					name: 'teams';
					results: modifiedEntity<WebApi.Entities.Team>[];
				};
		  }
		| undefined;
	isLoading: boolean;
}

export const initialState: PeoplePagesSearchState = {
	results: undefined,
	isLoading: false,
};
