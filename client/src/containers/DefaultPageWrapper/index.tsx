import React, { useEffect } from 'react';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { loadTypes, loadPriorities } from 'pages/CreateIssue/logic/actions';
import { fetchFilterDefs } from '../../commonLogic/filterDefs/actions';
import { Container } from 'semantic-ui-react';
import styles from './styles.module.scss';

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
		<Container className={styles.container}>
			<Header />
			{children}
		</Container>
	);
};

export default DefaultPageWrapper;
