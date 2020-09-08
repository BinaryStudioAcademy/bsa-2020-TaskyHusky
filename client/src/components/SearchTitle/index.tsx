import React from 'react';
import styles from './styles.module.scss';
import { Button } from 'semantic-ui-react';
import SaveFilterModal from 'containers/SaveFilterModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import Options from './FilterOptions';
import { useDispatch } from 'react-redux';
import { openModal } from 'containers/SaveFilterModal/logic/actions';
import { updateFilter } from 'containers/AdvancedSearch/logic/actions';

const SearchTitle: React.FC = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { filter, isFilterEdited } = useSelector((rootState: RootState) => rootState.advancedSearch);

	const onSaveAs = () => {
		dispatch(openModal());
	};

	const onSave = () => {
		dispatch(updateFilter());
	};
	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleContainer}>
				<h1 className={styles.filterName}>{filter ? filter.name : t('searchIssue')}</h1>
				<div className={styles.actionWrapper}>
					{isFilterEdited && filter ? (
						<>
							<div className={styles.actionItem}>
								<Button className={styles.saveBtn} onClick={onSave} compact>
									{t('save')}
								</Button>
								<Options />
							</div>
							<div className={styles.actionItem}></div>
						</>
					) : (
						<Button className={styles.saveBtn} onClick={onSaveAs} compact>
							{t('save_as')}
						</Button>
					)}
					<SaveFilterModal />
				</div>
			</div>
		</div>
	);
};

export default SearchTitle;
