import React, { useEffect, useState } from 'react';
import styles from './filters.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Input } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import searchResult from 'assets/images/search-result.svg';
import Spinner from 'components/common/Spinner';
import Table from './table';
import FiltersHeader from 'components/FiltersHeader';

const Filters: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { filters, isLoading } = useSelector((rootState: RootState) => rootState.filters);
	const { user } = useSelector((rootState: RootState) => rootState.auth);
	const [isTableEmpty, setIsTableEmpty] = useState(false);
	const [searchName, setSearchName] = useState<string>('');

	const filterFilters = () => {
		if (searchName === '') {
			return filters;
		}

		const searchString = new RegExp(searchName, 'gi');
		const filteredFilters = filters.filter(({ name }) => searchString.test(name));
		return filteredFilters;
	};

	const filteredFilters = filterFilters();

	useEffect(() => {
		setIsTableEmpty(filteredFilters.length === 0);
	}, [filteredFilters.length]);

	const updateFilter = (data: WebApi.Entities.Filter) => {
		dispatch(
			actions.updateFilter({
				data,
			}),
		);
	};

	const userId = user?.id;
	useEffect(() => {
		dispatch(actions.fetchFilters({ userId }));
	}, [dispatch, userId]);

	return (
		<div className={styles.main}>
			<FiltersHeader title={'Filters'} />
			<div className={styles.mainHeader}>
				<Input
					icon="search"
					placeholder={t('search')}
					onChange={(event, data) => setSearchName(data.value)}
					value={searchName}
				/>{' '}
				<div>
					<Button className="primaryBtn" onClick={() => history.push('/advancedSearch')}>
						{t('create_filter')}
					</Button>
				</div>
			</div>
			<div>
				{isLoading ? (
					<Spinner />
				) : (
					<div className={styles.container}>
						{!isTableEmpty ? (
							<Table filters={filteredFilters} updateFilter={updateFilter} />
						) : (
							<div className={styles.imgWrapper}>
								<div className={styles.content}>
									<img className={styles.img} src={searchResult} alt="No results" />
									<span className={styles.text}>{t('no_filters')}</span>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Filters;
