import React from 'react';
import { initialState } from './initalState';

const CreateIssueModalContext = React.createContext(initialState);
const CHANGE = 'CHANGE';

type Issue = WebApi.Entities.Issue;

const reducer = (state: Issue, action: any) => {
	switch (action.type) {
		case CHANGE: {
			return {
				...state,
				[action.key]: action.value,
			};
		}
		default: {
			return state;
		}
	}
};

export const ContextProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(reducer, initialState as Issue);
	const value = React.useMemo(() => ({ state, dispatch }), [state]);
	return <CreateIssueModalContext.Provider value={value} {...props} />;
};

export const useCreateIssueModalContext = () => {
	const context = React.useContext(CreateIssueModalContext);

	if (!context) {
		throw new Error('useCreateIssueModalContext must be used inside a ContextProvider');
	}

	const { state: data, dispatch } = context as WebApi.Issue.PartialIssue & {
		state: WebApi.Issue.PartialIssue;
		dispatch: (action: any) => void;
	};

	if (!dispatch) {
		throw new Error('useCreateIssueModalContext must be used inside a ContextProvider');
	}

	type Value = string | number | boolean | undefined | string[];

	const set = (key: keyof WebApi.Issue.PartialIssue, value: Value) =>
		dispatch({
			type: CHANGE,
			key,
			value,
		});

	return { data, set };
};
