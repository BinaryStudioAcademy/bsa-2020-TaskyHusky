import { createAction } from 'helpers/createAction.helper';
import * as actionTypes from './actionTypes';

export const startLoading = createAction<actionTypes.startLoading>(actionTypes.START_LOADING);
export const SuccessLoading = createAction<actionTypes.SuccessLoading>(actionTypes.SUCCESS_LOADING);

export const addPeople = createAction<actionTypes.addPeople>(actionTypes.ADD_PEOPLE);
export const createTeam = createAction<actionTypes.createTeam>(actionTypes.CREATE_TEAM);
