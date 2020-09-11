import React, { useEffect } from 'react';
import Header from '../Header';
import { useDispatch } from 'react-redux';
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
import { startLoading } from 'containers/Boards/logic/actions';

interface Props {
	children: JSX.Element[] | JSX.Element;
	isOverflowHidden?: boolean;
}

const DefaultPageWrapper: React.FC<Props> = (props) => {
	const { children, isOverflowHidden } = props;
	const dispatch = useDispatch();
	const params: { id: string | undefined } = useParams();
	let isIdValid = true;

	if (params.id) {
		isIdValid = validator.isUUID(params.id, '4');
	}

	useEffect(() => {
		dispatch(loadTypes());
		dispatch(loadProjects());
		dispatch(loadPriorities());
		dispatch(loadStatuses());
		dispatch(fetchFilterDefs());
		dispatch(requestAllUsers());
		dispatch(loadNotifications());
		dispatch(startLoading());
	}, [dispatch]);

	return (
		<>
			{!isIdValid ? (
				<NotFound />
			) : (
				<Container className={styles.container + ' fill'}>
					<Header />
					<div className={isOverflowHidden ? styles.content_flow__hidden : styles.content_flow}>
						{children}
					</div>
				</Container>
			)}
		</>
	);
};

export default DefaultPageWrapper;
