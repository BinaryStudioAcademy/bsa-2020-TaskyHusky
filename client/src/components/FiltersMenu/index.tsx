import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';

export const FiltersMenu = () => {
	const { t } = useTranslation();

	return (
		<Dropdown text={t('filters')} className={`${styles.media_query} link item`}>
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="filter" />
					Filter #1
				</Dropdown.Item>
				<Dropdown.Item>
					<Icon name="filter" />
					Filter #2
				</Dropdown.Item>
				<Dropdown.Header>{t('favorite')}</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="filter" />
					FavFilter #1
				</Dropdown.Item>
				<Dropdown.Item>
					<Icon name="filter" />
					FavFilter #2
				</Dropdown.Item>
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
