import React from 'react';
import styles from './styles.module.scss';
import SaveFilterModal from 'containers/SaveFilterModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import Options from './FilterOptions';

const SearchTitle: React.FC = () => {
	const { t } = useTranslation();
	const { filter, isFilterEdited } = useSelector((rootState: RootState) => rootState.advancedSearch);

	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleContainer}>
				<h1 className={styles.filterName}>{filter ? filter.name : t('searchIssue')}</h1>
				<div className={styles.actionWrapper}>
					<Options isEdited={!!(isFilterEdited && filter)} />
					<SaveFilterModal />
				</div>
			</div>
		</div>
	);
};

export default SearchTitle;
