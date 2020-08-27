import * as actionTypes from './actionTypes';
import { ProjectsPeopleState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectPeopleReducer = createReducer<ProjectsPeopleState>(initialState, {
	[actionTypes.START_ADDING_USERS](state) {
		return {
			...state,
		};
	},
	[actionTypes.SUCCESS_ADDING_USERS](state) {
		return {
			...state,
		};
	},
	[actionTypes.FAIL_ADDING_USERS](state) {
		return {
			...state,
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
			idAction: '',
		};
	},
	[actionTypes.FAIL_DELETING_USERS](state) {
		return {
			...state,
			idAction: '',
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
