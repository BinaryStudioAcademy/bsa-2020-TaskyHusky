import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { Button, Input } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import searchResult from 'assets/images/search-result.svg';
import Spinner from 'components/common/Spinner';
import Table from './table';

const Filters: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { filters, isLoading } = useSelector((rootState: RootState) => rootState.filters);
	const { user } = useSelector((rootState: RootState) => rootState.auth);
	const [isTableEmpty, setIsTableEmpty] = useState(false);

	const [searchName, setSearchName] = useState('');

	const filterFilters = () => {
		if (searchName === '') {
			return filters;
		}

		const searchString = new RegExp(searchName, 'i');
		const filteredFilters = filters.filter(({ name }) => searchString.test(name));
		return filteredFilters;
	};

	const filteredFilters = filterFilters();

	useEffect(() => {
		setIsTableEmpty(filteredFilters.length === 0);
	}, [filteredFilters.length]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		const searchValue = event.target.value;
		setSearchName(searchValue);
	};

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
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>{t('filters')}</h1>
					</div>
					<div className={styles.actionWrapper}>
						<Button className={styles.createBtn} onClick={() => history.push('/advancedSearch')} primary>
							{t('create_filter')}
						</Button>
					</div>
				</div>
				<div className={[styles.wrapperFilters, styles.filters].join(' ')}>
					<Input icon="search" placeholder={t('search')} onChange={onSearch} value={searchName} />
				</div>
			</div>
			<div className={styles.wrapper__table}>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
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
