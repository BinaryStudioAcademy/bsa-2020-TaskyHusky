import { ExampleState } from 'containers/Example/logic/state';
import { FilterState } from 'containers/Filters/logic/state';

export interface RootState {
	example: ExampleState;
	filters: FilterState;
}
