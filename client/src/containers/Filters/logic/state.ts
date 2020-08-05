import { fetchFilterParts } from './../../../services/filter.service';
import * as actions from './actions';

export interface FilterState {
	filters: WebApi.Entities.Filter[];
	filterParts?: WebApi.Entities.FilterPart[];
}

export const initialState: FilterState = {
	filters: [
		{ id: '1', stared: true, ownerId: '1', name: 'Done Filter' },
		{ id: '2', stared: false, ownerId: '2', name: 'In Progress Filter' },
	],
	filterParts: [],
};
