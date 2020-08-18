import { FilterPartState } from 'containers/AdvancedSearch/logic/state';

export type FilterProps = {
	filterPart: FilterPartState;
};

export type DefinitionEntity = {
	id: string;
	title: string;
	icon?: string;
	color: string;
};
