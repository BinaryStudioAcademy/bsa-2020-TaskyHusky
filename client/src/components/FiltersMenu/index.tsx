import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { fetchRecentFilters, fetchFavFilters } from 'containers/Filters/logic/actions';

export const FiltersMenu = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const { recent, favorite, filters } = useSelector((state: RootState) => state.filters);

	useEffect(() => {
		dispatch(fetchRecentFilters());
		dispatch(fetchFavFilters());
	}, [dispatch, filters]);

	return (
		<Dropdown text={t('filters')} className={`${styles.media_query} link item`}>
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				{recent.map((filter) => (
					<Dropdown.Item as="a" href={`/advancedSearch/${filter.id}`} key={filter.id}>
						{filter.name}
					</Dropdown.Item>
				))}
				<Dropdown.Header>{t('favorite')}</Dropdown.Header>
				{favorite.map((filter) => (
					<Dropdown.Item as="a" href={`/advancedSearch/${filter.id}`} key={filter.id}>
						{filter.name}
					</Dropdown.Item>
				))}
				<Dropdown.Divider />
				<Dropdown.Item as={Link} to="/filters">
					{t('view_all_filters')}
				</Dropdown.Item>
				<Dropdown.Item as={Link} to="/advancedSearch">
					{t('advanced_search')}
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default FiltersMenu;
