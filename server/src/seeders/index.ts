import { createConnection } from 'typeorm';
import { BoardSeeder } from './board.seeder';
import { ExampleSeeder } from './example.seeder';
import { UserSeeder } from './user.seeder';

createConnection().then(async () => {
	await ExampleSeeder.execute();
	await BoardSeeder.execute();
	await UserSeeder.execute();
}).catch(e => {
	// eslint-disable-next-line no-console
	console.error(e);
});
