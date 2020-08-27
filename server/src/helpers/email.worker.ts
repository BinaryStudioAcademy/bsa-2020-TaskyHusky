import amqplib from 'amqplib';
import { QUEUE } from '../constants/email.constants';
import { EmailService, EmailArgs } from '../services/email.service';

const open = amqplib.connect(process.env.AMQP_URL ?? '');

export const sendEmail = (payload: EmailArgs) =>
	open
		.then((connection) => connection.createChannel())
		.then((channel) =>
			channel.assertQueue(QUEUE).then(() => channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)))),
		)
		.catch((error) => {
			throw error;
		});

export function consumeMessageFromQueue() {
	open.then((connection) => connection.createChannel())
		.then((channel) =>
			channel.assertQueue(QUEUE).then(() => {
				return channel.consume(QUEUE, (msg) => {
					if (msg !== null) {
						const args: EmailArgs = JSON.parse(msg.content.toString());
						EmailService.sendEmail(args).then(() => {
							channel.ack(msg);
						});
					}
				});
			}),
		)
		.catch((error) => {
			throw error;
		});
}
