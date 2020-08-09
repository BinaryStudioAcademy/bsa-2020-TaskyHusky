import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from 'styles/headerDropDown.module.scss';
import { useTranslation } from 'react-i18next';

export const FiltersMenu = () => {
	const { t } = useTranslation();

	return (
		<Dropdown text={t('dashboards')} className="link item">
			<Dropdown.Menu className={styles.dropDownMenu}>
				<Dropdown.Header>{t('recent')}</Dropdown.Header>
				<Dropdown.Item>
					<Icon name="flipboard" />
					Dashboard
				</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item>{t('view_all_dashboards')}</Dropdown.Item>
				<Dropdown.Item>{t('create_dashboard')}</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default FiltersMenu;
