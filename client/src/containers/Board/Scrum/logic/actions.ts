import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const loadSprintsTrigger = createAction<actionTypes.loadSprintsTrigger>(actionTypes.LOAD_SPRINTS_TRIGGER);
export const loadSprintsSuccess = createAction<actionTypes.loadSprintsSuccess>(actionTypes.LOAD_SPRINTS_SUCCESS);

export const deleteSprintTrigger = createAction<actionTypes.deleteSprintTrigger>(actionTypes.DELETE_SPRINT_TRIGGER);
