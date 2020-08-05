import { AuthState } from './../containers/LoginPage/logic/state';
import { ExampleState } from 'containers/Example/logic/state';

export interface RootState {
	example: ExampleState;
	auth: AuthState;
}
