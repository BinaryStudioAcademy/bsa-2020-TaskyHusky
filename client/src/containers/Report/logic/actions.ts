import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadSprintById = createAction<actionTypes.LoadSprintById>(actionTypes.LOAD_SPRINT);
export const loadSprintByIdSuccess = createAction<actionTypes.LoadSprintByIdSuccess>(actionTypes.LOAD_SPRINT_SUCCESS);
