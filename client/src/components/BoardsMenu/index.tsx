import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import * as actions from '../../containers/Boards/logic/actions';

export const BoardsMenu = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.getRecentBoards());
	}, [dispatch]);

	const recentBoards = useSelector((rootState: RootState) => rootState.boards.recentBoards);

	return (
		<Dropdown text="Boards" className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>recent</Dropdown.Header>
				{recentBoards.map((board) => (
					<Dropdown.Item key={board.id}>{board.name}</Dropdown.Item>
				))}
				<Dropdown.Divider />
				<Dropdown.Item>Create Board</Dropdown.Item>
				<Dropdown.Item>View all boards</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default BoardsMenu;
