import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const openModal = createAction(actionTypes.OPEN_MODAL);

export const closeModal = createAction(actionTypes.CLOSE_MODAL);

export const startSavingFilter = createAction<actionTypes.InitialFilter>(actionTypes.START_SAVING_FILTER);

export const successSavingFilter = createAction(actionTypes.SUCCESS_SAVING_FILTER);

export const failSavingFilter = createAction(actionTypes.FAIL_SAVING_FILTER);

export const resetState = createAction(actionTypes.RESET_STATE);
