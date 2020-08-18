import React, { useEffect } from 'react';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { loadTypes, loadPriorities, loadStatuses } from 'pages/IssuePage/logic/actions';
import { fetchFilterDefs } from '../../commonLogic/filterDefs/actions';
import { Container } from 'semantic-ui-react';
import { startLoading as loadProjects } from 'containers/Projects/logic/actions';
import styles from './styles.module.scss';
import { requestAllUsers } from 'commonLogic/users/actions';

interface Props {
	children: JSX.Element[] | JSX.Element;
}

const DefaultPageWrapper: React.FC<Props> = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTypes());
		dispatch(loadProjects());
		dispatch(loadPriorities());
		dispatch(loadStatuses());
		dispatch(fetchFilterDefs());
		dispatch(requestAllUsers());
	}, [dispatch]);

	return (
		<Container className={styles.container + ' fill'}>
			<Header />
			{children}
		</Container>
	);
};

export default DefaultPageWrapper;
