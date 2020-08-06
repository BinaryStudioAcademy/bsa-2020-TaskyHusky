import { UserState } from 'containers/ProfilePage/logiс/state';
import { ExampleState } from 'containers/Example/logic/state';

export interface RootState {
	example: ExampleState;
	user: UserState;
}
