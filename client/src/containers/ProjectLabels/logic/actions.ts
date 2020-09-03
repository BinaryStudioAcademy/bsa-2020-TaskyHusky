import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startAddingLabel = createAction<actionTypes.Label>(actionTypes.START_ADDING_LABEL);
export const successAddingLabel = createAction(actionTypes.SUCCESS_ADDING_LABEL);
export const failAddingLabel = createAction(actionTypes.FAIL_ADDING_LABEL);

export const startUpdatingLabel = createAction<actionTypes.Label>(actionTypes.START_UPDATING_LABEL);
export const successUpdatingLabel = createAction(actionTypes.SUCCESS_UPDATING_LABEL);
export const failUpdatingLabel = createAction(actionTypes.FAIL_UPDATING_LABEL);

export const startDeletingLabel = createAction<actionTypes.DeleteLabel>(actionTypes.START_DELETING_LABEL);
export const successDeletingLabel = createAction(actionTypes.SUCCESS_DELETING_LABEL);
export const failDeletingLabel = createAction(actionTypes.FAIL_DELETING_LABEL);

export const openModal = createAction(actionTypes.OPEN_MODAL);
export const openEditModal = createAction<actionTypes.EditLabel>(actionTypes.OPEN_EDIT_MODAL);
export const closeModal = createAction(actionTypes.CLOSE_MODAL);
