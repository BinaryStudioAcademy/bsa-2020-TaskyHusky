import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const fetchFilters = createAction(actionTypes.FETCH_FILTERS);
export const fetchFilterParts = createAction(actionTypes.FETCH_FILTER_PARTS);
export const fetchFilterDefs = createAction(actionTypes.FETCH_FILTER_DEFS);

export const fetchFiltersSuccess = createAction<actionTypes.FetchFiltersSuccessArgs>(actionTypes.FETCH_FILTERS_SUCCESS);
export const fetchFilterPartsSuccess = createAction<actionTypes.FetchFilterPartsSuccessArgs>(
	actionTypes.FETCH_FILTER_PARTS_SUCCESS,
);
export const fetchFilterDefsSuccess = createAction<actionTypes.FetchFilterDefsSuccessArgs>(
	actionTypes.FETCH_FILTER_DEFS_SUCCESS,
);
