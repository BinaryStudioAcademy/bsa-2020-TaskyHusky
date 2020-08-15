import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../typings/rootState';
import * as actions from '../../containers/Boards/logic/actions';
import { useTranslation } from 'react-i18next';

export const BoardsMenu = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(actions.getRecentBoards());
	}, [dispatch]);

	const recentBoards = useSelector((rootState: RootState) => rootState.boards.recentBoards);

	return (
		<Dropdown text={t('boards')} className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				{recentBoards.map((board) => (
					<Dropdown.Item key={board.id}>{board.name}</Dropdown.Item>
				))}
				<Dropdown.Divider />
				<Dropdown.Item>{t('create_board')}</Dropdown.Item>
				<Dropdown.Item>{t('view_all_boards')}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default BoardsMenu;
