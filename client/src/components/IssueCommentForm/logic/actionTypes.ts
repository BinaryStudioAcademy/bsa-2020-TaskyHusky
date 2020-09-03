export const ADD_COMMENT = 'ISSUE:COMMENT:ADD';
export const DELETE_COMMENT = 'ISSUE:COMMENT:DELETE';

export type AddComment = {
	text: string;
	issueId: string;
};

export type DeleteComment = {
	id: string;
};
