import * as actionTypes from './actionTypes';
import { createAction } from 'helpers/createAction.helper';

export const addComment = createAction<actionTypes.AddComment>(actionTypes.ADD_COMMENT);
export const deleteComment = createAction<actionTypes.DeleteComment>(actionTypes.DELETE_COMMENT);
