import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const fetchFilterDefs = createAction(actionTypes.FETCH_FILTER_DEFS);
export const updateStateSuccess = createAction<actionTypes.UpdateStateSuccessArgs>(
	actionTypes.UPDATE_COMMON_STATE_SUCCESS,
);
