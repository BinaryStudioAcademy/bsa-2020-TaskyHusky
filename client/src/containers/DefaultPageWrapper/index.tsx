import React, { useEffect } from 'react';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { loadTypes, loadPriorities } from 'pages/CreateIssue/logic/actions';
import { fetchFilterDefs } from '../../commonLogic/filterDefs/actions';

interface Props {
	children: JSX.Element[] | JSX.Element;
}

const DefaultPageWrapper: React.FC<Props> = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTypes());
		dispatch(loadPriorities());
		dispatch(fetchFilterDefs());
	}, [dispatch]);

	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default DefaultPageWrapper;
