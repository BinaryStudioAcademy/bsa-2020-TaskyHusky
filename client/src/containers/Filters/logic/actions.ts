import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const updateFilter = createAction<actionTypes.UpdateFilterArgs>(actionTypes.UPDATE_FILTER);
export const fetchFilters = createAction(actionTypes.FETCH_FILTERS);
export const fetchFilterParts = createAction(actionTypes.FETCH_FILTER_PARTS);
export const fetchFilterDefs = createAction(actionTypes.FETCH_FILTER_DEFS);

export const updateFilterSuccess = createAction<actionTypes.UpdateFilterSuccessArgs>(actionTypes.UPDATE_FILTER_SUCCESS);
export const fetchFiltersSuccess = createAction<actionTypes.FetchFiltersSuccessArgs>(actionTypes.FETCH_FILTERS_SUCCESS);
