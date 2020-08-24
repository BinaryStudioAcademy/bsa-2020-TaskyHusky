import React, { useEffect } from 'react';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { loadTypes, loadPriorities, loadStatuses } from 'pages/IssuePage/logic/actions';
import { fetchFilterDefs } from '../../commonLogic/filterDefs/actions';
import { Container } from 'semantic-ui-react';
import { startLoading as loadProjects } from 'containers/Projects/logic/actions';
import styles from './styles.module.scss';
import { requestAllUsers } from 'commonLogic/users/actions';
import { useParams } from 'react-router-dom';
import NotFound from 'pages/404';
import validator from 'validator';
import { loadNotifications } from 'components/NotificationsMenu/logic/actions';
import { RootState } from 'typings/rootState';
interface Props {
	children: JSX.Element[] | JSX.Element;
}

const DefaultPageWrapper: React.FC<Props> = ({ children }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const params: { id: string | undefined } = useParams();
	let isIdValid = true;

	if (params.id) {
		isIdValid = validator.isUUID(params.id, '4');
	}

	useEffect(() => {
		if (user) {
			dispatch(loadTypes());
			dispatch(loadProjects());
			dispatch(loadPriorities());
			dispatch(loadStatuses());
			dispatch(fetchFilterDefs());
			dispatch(requestAllUsers());
			dispatch(loadNotifications({ userId: user.id }));
		}
	}, [dispatch, user]);

	return (
		<>
			{!isIdValid ? (
				<NotFound />
			) : (
				<Container className={styles.container + ' fill'}>
					<Header />
					{children}
				</Container>
			)}
		</>
	);
};

export default DefaultPageWrapper;
