import { Model, Server } from 'miragejs';
import { people } from './mockData/people';
import { teams } from './mockData/teams';

//uncomment fakeServer in index.ts for work with fake server
export default new Server({
	models: {
		user: Model,
		teams: Model,
	},
	namespace: '/api/fake',
	routes() {


		/*this.get('/people', (sheme, request) => {
			const { name: nameFilter } = request.queryParams;
			if (nameFilter) {
				return people.filter((people) => {
					const fullName = people.firstName + ' ' + people.lastName
					return fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1
				});
			}
			return people;
		});
		this.get('/teams', (sheme, request) => {
			const { name: nameFilter } = request.queryParams;
			if (nameFilter) {
				return teams.filter((team) => team.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1);
			}
			return teams;
		});*/

		this.post('/teams', () => teams, { timing: 3000 });
	},
});
