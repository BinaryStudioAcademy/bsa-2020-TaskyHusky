import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Button, Input, Form } from 'semantic-ui-react';
import FilterPart from 'components/FilterPart';
import MoreFilterPartsDropdown from 'components/MoreFilters';
import { fetchFilterParts } from './logic/actions';
import { FilterPartState } from './logic/state';

const QUICK_FILTER_IDS = [
	'c96b69bd-4285-4cf0-81d9-d81316a4c234',
	'89104794-fc1b-466e-92a8-bc759b98b8e4',
	'ecf71215-3c72-4aa5-afac-fa55588d51b6',
	'88a10c4b-bf0c-42fb-8f4b-63107dc0f10f',
];

const AdvancedFilters: React.FC = () => {
	const dispatch = useDispatch();
	const { filterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [addedFilterParts, setAddedFilterParts] = useState([] as FilterPartState[]);
	const getFilterOptionsFormQueryParams = () => {
		const options = filterParts.map((filterPart) => {
			const { filterDef, members } = filterPart;
			console.log('members', members);
		});
	};

	useEffect(() => {
		dispatch(fetchFilterParts());
		//
		getFilterOptionsFormQueryParams();
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
