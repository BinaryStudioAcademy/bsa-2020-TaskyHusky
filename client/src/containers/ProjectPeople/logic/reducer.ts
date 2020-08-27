import * as actionTypes from './actionTypes';
import { ProjectsPeopleState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectPeopleReducer = createReducer<ProjectsPeopleState>(initialState, {
	[actionTypes.START_ADDING_USERS](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_ADDING_USERS](state) {
		return {
			...state,
			isLoading: false,
			isAdded: true,
		};
	},
	[actionTypes.FAIL_ADDING_USERS](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.START_DELETING_USERS](state, { usersId }) {
		return {
			...state,
			idAction: usersId,
		};
	},
	[actionTypes.SUCCESS_DELETING_USERS](state) {
		return {
			...state,
			isDeleted: true,
			idAction: '',
		};
	},
	[actionTypes.FAIL_DELETING_USERS](state) {
		return {
			...state,
			idAction: '',
		};
	},
	[actionTypes.RESET_STATE]() {
		return {
			...initialState,
		};
	},
	[actionTypes.START_GETTING_PEOPLE](state) {
		return {
			...state,
			isPeopleLoading: true,
		};
	},
	[actionTypes.SUCCESS_GETTING_PEOPLE](state, { people }) {
		return {
			...state,
			isPeopleLoading: false,
			people,
		};
	},
	[actionTypes.FAIL_GETTING_PEOPLE](state) {
		return {
			...state,
			isPeopleLoading: false,
		};
	},
});
