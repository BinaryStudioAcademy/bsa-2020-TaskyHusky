import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction<actionTypes.StartLoadingArgs>(actionTypes.START_LOADING);
export const update = createAction<actionTypes.SuccessLoading>(actionTypes.SUCCESS_LOADING);
export const failLoading = createAction(actionTypes.FAIL_LOADING);

export const addLinkLoading = createAction<actionTypes.AddLinkSuccess>(actionTypes.ADD_LINK_LOADING);
export const deleteLinkLoading = createAction<actionTypes.AddLinkSuccess>(actionTypes.DELETE_LINK_LOADING);
export const updateFieldsLoading = createAction<actionTypes.EditFieldLoadingArgs>(actionTypes.UPDATE_FIELD_LOADING);
