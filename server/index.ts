import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { appPort } from './config/app.config';
import routes from './src/routes';
import passport from './config/passport.config';

createConnection().then(async (connection) => {
	await connection.runMigrations();
	const app = express();
	app.use(cors());
	app.use(bodyParser.json());
	app.use(passport.initialize());

	app.use('/api', routes);

	app.listen(appPort, () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running on port ${appPort}`);
	});
});
