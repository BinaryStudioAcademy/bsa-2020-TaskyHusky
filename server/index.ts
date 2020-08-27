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
import { configIO, injectIO } from './config/io.config';
import IOHandlers from './src/socketConnectionHandlers';
import { consumeMessageFromQueue } from './src/helpers/email.worker';

createConnection()
	.then(async (connection) => {
		await connection.runMigrations();
		const app = express();
		const { io, http } = configIO(app, IOHandlers);

		app.use(
			cors({
				origin: '*',
				allowedHeaders: [
					'Origin',
					'X-Requested-With',
					'Content-Type',
					'Accept',
					'Authorization',
					'Access-Control-Allow-Origin',
				],
			}),
		);

		app.use(bodyParser.json());
		app.use(passport.initialize());
		app.use(injectIO(io));

		app.use('/', (req, res, next) => (req.path === '/' ? res.sendStatus(200) : next())); // health check
		app.use('/api', authenticateJwt(routesWhiteList), routes);

		app.use(errorHandlerMiddleware);
		consumeMessageFromQueue();

		// No express app here!!!
		http.listen(appPort, () => {
			// eslint-disable-next-line no-console
			console.log(`Server is running on port ${appPort}`);
		});
	})
	// eslint-disable-next-line no-console
	.catch((err) => console.log(err));
