import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const fetchFilterParts = createAction(actionTypes.FETCH_FILTER_PARTS);

export const updateSearchSuccess = createAction<actionTypes.UpdateSearchArgs>(actionTypes.UPDATE_SEARCH_SUCCESS);

export const updateFilterPart = createAction<actionTypes.UpdateFilterPartArgs>(actionTypes.UPDATE_FILTER_PART);

export const updateFilterPartSuccess = createAction<actionTypes.UpdateFilterPartArgs>(
	actionTypes.UPDATE_FILTER_PART_SUCCESS,
);
