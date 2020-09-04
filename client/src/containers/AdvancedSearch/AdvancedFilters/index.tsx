import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Form } from 'semantic-ui-react';
import FilterPart from 'components/AdvancedSearch/FilterPart';
import MoreFilterPartsDropdown from 'components/AdvancedSearch/MoreFilters';
import { fetchFilterParts, setAddedFilterParts, loadIssues } from '../logic/actions';
import { FilterPartState } from '../logic/state';
import { useParams } from 'react-router';
import { getDefaultFilterParts, getAdditionalFilterParts } from '../logic/helpers';
import ContainTextInput from 'components/ContainTextInput';

const AdvancedFilters: React.FC = () => {
	const dispatch = useDispatch();
	const { filterParts, addedFilterParts, filterPartsLoaded } = useSelector(
		(rootState: RootState) => rootState.advancedSearch,
	);
	const isFilterDefLoading = useSelector((state: RootState) => state.filterDefs.isLoading);
	const { filterId } = useParams();
	const [startIssuesLoaded, setStartIssuesLoaded] = useState<boolean>(false);

	useEffect(() => {
		if (!isFilterDefLoading) {
			dispatch(fetchFilterParts({ id: filterId }));
		}
	}, [dispatch, isFilterDefLoading, filterId]);

	useEffect(() => {
		if (filterPartsLoaded && !startIssuesLoaded) {
			dispatch(loadIssues({}));
			setStartIssuesLoaded(true);
		}
	}, [dispatch, filterPartsLoaded, startIssuesLoaded]);

	const setAddedFilterPartsHandler = (addedFilterParts: FilterPartState[]) => {
		dispatch(setAddedFilterParts({ addedFilterParts }));
	};

	return (
		<div className={styles.bottomBarWrapper}>
			<Form>
				<Form.Group className={styles.searchContentContainer}>
					{getDefaultFilterParts(filterParts).map((part) => (
						<FilterPart key={part.id} filterPart={part} />
					))}
					<MoreFilterPartsDropdown
						additionalFilterParts={getAdditionalFilterParts(filterParts)}
						addedFilterParts={addedFilterParts}
						setAddedFilterParts={(data) => setAddedFilterPartsHandler(data)}
					/>
					<ContainTextInput />
				</Form.Group>
				<Form.Group>
					{addedFilterParts.map((part) => (
						<FilterPart key={part.id} filterPart={part} />
					))}
				</Form.Group>
			</Form>
		</div>
	);
};

export default AdvancedFilters;
