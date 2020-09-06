import React from 'react';
import initialState from './initialState';

const CHANGE = 'CHANGE';
const Context = React.createContext(initialState);

const reducer = (state: WebApi.Board.CreateBoardColumn, action: any) => {
	switch (action.type) {
		case CHANGE:
			return {
				...state,
				[action.key]: action.value ?? null,
			};
		default:
			return state;
	}
};

export const ContextProvider: React.FC<any> = (props) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <Context.Provider value={value} {...props} />;
};

export const useBoardColumnContext = () => {
	const context = React.useContext(Context);

	if (!context) {
		throw new Error('useBoardColumnContext must be inside a context provider.');
	}

	const { state: data, dispatch } = (context as unknown) as {
		state: WebApi.Board.CreateBoardColumn;
		dispatch: (action: any) => void;
	};

	if (!dispatch) {
		throw new Error('useBoardColumnContext must be inside a context provider.');
	}

	type Value = string | number | boolean | undefined | string[];

	const set = (key: keyof WebApi.Board.CreateBoardColumn, value: Value) =>
		dispatch({
			type: CHANGE,
			key,
			value,
		});

	return { data, set };
};
