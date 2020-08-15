import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { appPort } from './config/app.config';
import routes from './src/routes';
import passport from './config/passport.config';
import { routesWhiteList } from './config/jwt.config';
import { authenticateJwt } from './src/middleware/jwt.middleware';
import errorHandlerMiddleware from './src/middleware/errorHandler.middleware';

createConnection()
	.then(async (connection) => {
		await connection.runMigrations();
		const app = express();
		app.use(
			cors({
				origin: '*',
				allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
			}),
		);

		app.use(bodyParser.json());
		app.use(passport.initialize());
		app.use(passport.session());

		app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check
		app.use('/api', authenticateJwt(routesWhiteList), routes);

		app.use(errorHandlerMiddleware);

		app.listen(appPort, () => {
			// eslint-disable-next-line no-console
			console.log(`Server is running on port ${appPort}`);
		});
	})
	// eslint-disable-next-line no-console
	.catch((err) => console.log(err));
