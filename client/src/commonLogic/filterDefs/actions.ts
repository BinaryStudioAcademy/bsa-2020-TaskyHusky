import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const fetchFilterDefs = createAction(actionTypes.FETCH_FILTER_DEFS);
export const updateFilterDefsSuccess = createAction<actionTypes.UpdateFilterDefsSuccessArgs>(
	actionTypes.UPDATE_FILTER_DEFS_SUCCESS,
);
