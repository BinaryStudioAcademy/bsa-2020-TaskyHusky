import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Button, Input, Form } from 'semantic-ui-react';
import FilterPart from 'components/FilterPart';
import MoreFilterPartsDropdown from 'components/MoreFilters';
import { fetchFilterParts } from '../logic/actions';
import { FilterPartState } from '../logic/state';
import { filterDefsIDS } from 'constants/FilterDef';

const QUICK_FILTER_IDS = [
	filterDefsIDS.PROJECTS,
	filterDefsIDS.STATUS,
	filterDefsIDS.ISSUE_TYPE,
	filterDefsIDS.ASSIGNEE,
];

const AdvancedFilters: React.FC = () => {
	const dispatch = useDispatch();
	const { filterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [addedFilterParts, setAddedFilterParts] = useState<FilterPartState[]>([]);

	useEffect(() => {
		dispatch(fetchFilterParts());
	}, [dispatch]);

	const getDefaultFilterParts = () => {
		return filterParts.filter(({ filterDef }) =>
			QUICK_FILTER_IDS.find((quickFilterID) => filterDef.id === quickFilterID),
		);
	};

	const getAdditionalFilterParts = () => {
		return filterParts.filter(
			({ filterDef }) => !QUICK_FILTER_IDS.find((quickFilterID) => filterDef.id === quickFilterID),
		);
	};

	return (
		<div className={styles.bottomBarWrapper}>
			<Form>
				<Form.Group className={styles.searchContentContainer}>
					{getDefaultFilterParts().map((part) => (
						<FilterPart key={part.id} filterPart={part} />
					))}
					<MoreFilterPartsDropdown
						additionalFilterParts={getAdditionalFilterParts()}
						addedFilterParts={addedFilterParts}
						setAddedFilterParts={(data) => setAddedFilterParts(data)}
					/>
					<Form.Field
						control={() => (
							<div className={styles.searchInputContainer}>
								<Input placeholder="Contains text" className={styles.containTextInput} />
								<Button className={styles.searchBtn} primary content="Search" />
							</div>
						)}
					/>
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
