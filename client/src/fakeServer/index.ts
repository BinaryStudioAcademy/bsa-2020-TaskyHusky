import { Server } from 'miragejs';
import { people } from './mockData/people';
import { teams } from './mockData/teams';

export default new Server({
	routes() {
		this.namespace = '/api/fake';

		this.get('/people', () => people, { timing: 2000 });
		this.get('/teams', () => teams, { timing: 3000 });
	},
});
