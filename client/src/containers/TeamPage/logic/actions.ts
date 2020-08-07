import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction<actionTypes.StartLoadingArgs>(actionTypes.START_LOADING);
export const successLoading = createAction<actionTypes.SuccessLoading>(actionTypes.SUCCESS_LOADING);
export const failLoading = createAction(actionTypes.FAIL_LOADING);
