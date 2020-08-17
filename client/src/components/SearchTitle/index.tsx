import React, { useState } from 'react';
import styles from './styles.module.scss';
import { List, Icon } from 'semantic-ui-react';
import SaveFilterModal from 'containers/SaveFilterModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';

const SearchTitle: React.FC = () => {
	const [stared, setStared] = useState(false);
	const { t } = useTranslation();
	const { filter } = useSelector((rootState: RootState) => rootState.advancedSearch);

	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleContainer}>
				<h1 className={styles.filterName}>{filter ? filter.name : t('searchIssue')}</h1>
				<SaveFilterModal />
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
