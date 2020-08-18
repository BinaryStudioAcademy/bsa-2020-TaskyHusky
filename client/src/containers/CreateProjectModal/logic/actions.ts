import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const openModal = createAction(actionTypes.OPEN_MODAL);

export const closeModal = createAction(actionTypes.CLOSE_MODAL);

export const startCreatingProject = createAction<actionTypes.InitialProject>(actionTypes.START_CREATING_PROJECT);

export const successCreatingProject = createAction(actionTypes.SUCCESS_CREATING_PROJECT);

export const failCreatingProject = createAction(actionTypes.FAIL_CREATING_PROJECT);

export const resetState = createAction(actionTypes.RESET_STATE);

export const startGettingKeys = createAction(actionTypes.START_GETTING_KEYS);
export const successGettingKeys = createAction<actionTypes.Keys>(actionTypes.SUCCESS_GETTING_KEYS);
export const failGettingKeys = createAction(actionTypes.FAIL_GETTING_KEYS);
