import * as actionTypes from './actionTypes';
import { ProjectLabelState, initialState } from './state';
import { createReducer } from 'helpers/createReducer.helper';

export const projectLabelReducer = createReducer<ProjectLabelState>(initialState, {
	[actionTypes.START_ADDING_LABEL](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_ADDING_LABEL]() {
		return {
			...initialState,
		};
	},
	[actionTypes.FAIL_ADDING_LABEL](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.START_UPDATING_LABEL](state) {
		return {
			...state,
			isLoading: true,
		};
	},
	[actionTypes.SUCCESS_UPDATING_LABEL]() {
		return {
			...initialState,
		};
	},
	[actionTypes.FAIL_UPDATING_LABEL](state) {
		return {
			...state,
			isLoading: false,
		};
	},
	[actionTypes.START_DELETING_LABEL](state, { labelId }) {
		return {
			...state,
			labelDeletingId: labelId,
		};
	},
	[actionTypes.SUCCESS_DELETING_LABEL]() {
		return {
			...initialState,
		};
	},
	[actionTypes.FAIL_UPDATING_LABEL](state) {
		return {
			...state,
			labelDeletingId: '',
		};
	},
	[actionTypes.OPEN_MODAL](state) {
		return {
			...state,
			isModalOpen: true,
		};
	},
	[actionTypes.OPEN_EDIT_MODAL](state, { editLabel }) {
		return {
			...state,
			isModalOpen: true,
			isEditMode: true,
			editLabel,
		};
	},
	[actionTypes.CLOSE_MODAL](state) {
		return {
			...state,
			isModalOpen: false,
			isEditMode: false,
			editLabel: undefined,
		};
	},
	default(state) {
		return state;
	},
});
