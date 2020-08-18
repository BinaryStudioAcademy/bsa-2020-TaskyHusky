import * as actionTypes from './actionTypes';
import { TeamState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const teamReducer = createReducer<TeamState>(initialState, {
	[actionTypes.SUCCESS_TEAM_LOADING](state: TeamState, action: actionTypes.SuccessLoadingTeam) {
		return {
			...state,
			team: action.team,
			loading: false,
		};
	},

	[actionTypes.SUCCESS_TEAM_USERS_LOADING](state: TeamState, action: actionTypes.SuccessLoadingUsers) {
		return {
			...state,
			team: {
				...state.team,
				createdBy: action.createdBy,
				users: action.users
			}
		};
	},

	[actionTypes.SUCCESS_TEAM_PROJECTS_LOADING](state: TeamState, action: actionTypes.SuccessLoadingProjects) {
		return {
			...state,
			team: {
				...state.team,
				projects: action.projects
			}
		};
	},

	[actionTypes.UPDATE_FIELD_SUCCESS](state: TeamState, action: actionTypes.SuccessLoadingProjects) {
		return {
			...state,
			team: {
				...state.team,
				...action
			}
		};
	},

	[actionTypes.UPDATE_LINK_FIELD_SUCCESS](state: TeamState, action: actionTypes.AddLinkSuccess) {
		return {
			...state,
			team: {
				...state.team,
				links: action.links
			}
		};
	},

	[actionTypes.LOADING](state: TeamState) {
		return {
			...state,
			team: {
				...state.team,
			},
			loading: true,
		};
	},
	[actionTypes.FAIL_LOADING](state: TeamState) {
		return {
			...state,
			loading: false,
		};
	},
});
