import React, { useState } from 'react';
import styles from './styles.module.scss';
import { List, Icon, Button } from 'semantic-ui-react';
import SaveFilterModal from 'containers/SaveFilterModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';
import Options from './FilterOptions';
import { useDispatch } from 'react-redux';
import { openModal } from 'containers/SaveFilterModal/logic/actions';
import { updateFilter } from 'containers/AdvancedSearch/logic/actions';

const SearchTitle: React.FC = () => {
	const [stared, setStared] = useState(false);
	const { t } = useTranslation();
	const { filter, isFilterEdited } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const dispatch = useDispatch();

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
									<Button onClick={onSave} compact>
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
						<Button onClick={onSaveAs} compact>
							{t('save_as')}
						</Button>
					)}
					<SaveFilterModal />
				</List>
			</div>
			<div className={styles.actionWrapper}>
				<List selection horizontal>
					<List.Item>
						<div onClick={() => setStared(!stared)} className={styles.actionItem}>
							<div className={styles.star}>
								{stared ? <Icon name="star" color="yellow" /> : <Icon name="star outline" />}
							</div>
						</div>
					</List.Item>
					<List.Item>
						<div className={styles.actionItem}>
							<Icon name="share alternate" />
							<List.Content>Share</List.Content>
						</div>
					</List.Item>
					<List.Item>
						<div className={styles.actionItem}>
							<Icon name="external share" />
							<List.Content>Export</List.Content>
						</div>
					</List.Item>
					<List.Item>
						<div className={styles.actionItem}>
							<Icon name="ellipsis horizontal" />
						</div>
					</List.Item>
				</List>
			</div>
		</div>
	);
};

export default SearchTitle;
