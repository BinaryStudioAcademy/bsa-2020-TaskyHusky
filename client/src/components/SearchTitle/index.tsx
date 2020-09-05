import React from 'react';
import styles from './styles.module.scss';
import { List, Button } from 'semantic-ui-react';
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
				<List horizontal>
					<List.Item>
						<div>
							<h1 className={styles.filterName}>{filter ? filter.name : t('searchIssue')}</h1>
						</div>
					</List.Item>
					{isFilterEdited && filter ? (
						<>
							<List.Item>
								<div className={styles.actionItem}>
									<List.Content>- Edited</List.Content>
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}>
									<Button className={styles.saveBtn} onClick={onSave} compact>
										{t('save')}
									</Button>
									<Options />
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}></div>
							</List.Item>
						</>
					) : (
						<Button className={styles.saveBtn} onClick={onSaveAs} compact>
							{t('save_as')}
						</Button>
					)}
					<SaveFilterModal />
				</List>
			</div>
		</div>
	);
};

export default SearchTitle;
